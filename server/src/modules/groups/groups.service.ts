import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParticipantWithoutGroupIdDto } from 'src/modules/participants/dto/create-participant-without-group-id.dto';
import { Participant } from 'src/modules/participants/entities/participant.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { FindAllGroupsParamsDto } from './dto/find-all-groups-params.dto';
import { GroupSummaryRaw } from './dto/group-summary-raw.dto';
import { GroupSummaryDto } from './dto/group-summary.dto';
import { GroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  /**
   * Get list of groups by queries
   * @param {FindAllGroupsParamsDto} query - Queries for fetching the groups.
   * @param {string} query.clientId - The id of the client.
   * @param {boolean} query.withSummary - The state for fetching the groups with their summary.
   * @returns {(GroupDto | GroupSummaryDto)[]} - The list of group (raw or with summary).
   */
  async findAll(
    clientId: string,
    query: FindAllGroupsParamsDto,
  ): Promise<(GroupDto | GroupSummaryDto)[]> {
    const { withSummary } = query;

    const qb = this.groupRepository.createQueryBuilder('g');

    qb.andWhere('g.client_id = :clientId', { clientId });

    if (withSummary) {
      qb.leftJoin(
        (qb) =>
          qb
            .select('e.group_id', 'group_id')
            .addSelect('COUNT(*)', 'expenses_count')
            .addSelect('COALESCE(SUM(e.amount), 0)', 'total_amount')
            .addSelect(
              'COALESCE(SUM(e.amount) FILTER (WHERE e.is_settled = false), 0)',
              'unsettled_amount',
            )
            .addSelect('BOOL_AND(e.is_settled)', 'is_fully_settled')
            .from('expenses', 'e')
            .groupBy('e.group_id'),
        'es',
        'es.group_id = g.id',
      )
        .leftJoin(
          (qb) =>
            qb
              .select('p.group_id', 'group_id')
              .addSelect('COUNT(*)', 'participants_count')
              .from('participants', 'p')
              .groupBy('p.group_id'),
          'ps',
          'ps.group_id = g.id',
        )
        .select('g.id', 'id')
        .addSelect('g.title', 'title')
        .addSelect('COALESCE(ps.participants_count, 0)', 'participantsCount')
        .addSelect('COALESCE(es.expenses_count, 0)', 'expensesCount')
        .addSelect('COALESCE(es.total_amount, 0)', 'totalAmount')
        .addSelect('COALESCE(es.unsettled_amount, 0)', 'unsettledAmount')
        .addSelect('COALESCE(es.is_fully_settled, true)', 'isFullySettled')
        .where('g.client_id = :clientId', { clientId });
    }

    const raw = await qb.getRawMany<GroupSummaryRaw>();

    return raw.map(
      (row): GroupSummaryDto => ({
        id: row.id,
        title: row.title,
        participantsCount: Number(row.participantsCount),
        expensesCount: Number(row.expensesCount),
        totalAmount: Number(row.totalAmount),
        unsettledAmount: Number(row.unsettledAmount),
        isFullySettled:
          row.isFullySettled === true || row.isFullySettled === 'true',
      }),
    );
  }

  /**
   * Find a group with summary
   * @param {string} id - Id of the group
   * @returns
   */
  async findOne(id: string): Promise<GroupSummaryDto> {
    const qb = this.groupRepository.createQueryBuilder('g');

    // Joining expenses to get the expensesCount
    qb.leftJoin(
      (qb) =>
        qb
          .select('e.group_id', 'group_id')
          .addSelect('COUNT(*)', 'expenses_count')
          .addSelect('COALESCE(SUM(e.amount), 0)', 'total_amount')
          .addSelect(
            'COALESCE(SUM(e.amount) FILTER (WHERE e.is_settled = false), 0)',
            'unsettled_amount',
          )
          .addSelect('BOOL_AND(e.is_settled)', 'is_fully_settled')
          .from('expenses', 'e')
          .groupBy('e.group_id'),
      'es',
      'es.group_id = g.id',
    );

    // Joining participants to get the participantsCount
    qb.leftJoin(
      (qb) =>
        qb
          .select('p.group_id', 'group_id')
          .addSelect('COUNT(*)', 'participants_count')
          .from('participants', 'p')
          .groupBy('p.group_id'),
      'ps',
      'ps.group_id = g.id',
    );

    // Stitching all
    qb.select('g.id', 'id')
      .addSelect('g.title', 'title')
      .addSelect('COALESCE(ps.participants_count, 0)', 'participantsCount')
      .addSelect('COALESCE(es.expenses_count, 0)', 'expensesCount')
      .addSelect('COALESCE(es.total_amount, 0)', 'totalAmount')
      .addSelect('COALESCE(es.unsettled_amount, 0)', 'unsettledAmount')
      .addSelect('COALESCE(es.is_fully_settled, true)', 'isFullySettled')
      .where('g.id = :id', { id });

    const raw = await qb.getRawOne<GroupSummaryRaw>();
    if (!raw) throw new NotFoundException();

    return mapRawToGroupSummaryDto(raw);
  }

  /**
   * Create a group and its participants
   * @param {Object} createGroupDto - Create group payload
   * @returns
   */
  async create(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return await this.groupRepository.manager.transaction(async (manager) => {
      // 1. Create the group
      const group = manager.create(Group, {
        clientId: createGroupDto.clientId,
        title: createGroupDto.title,
      });
      await manager.save(group); // Now we have group.id

      // 2. Create participants
      const participants = createGroupDto.participants.map((participant) => {
        return manager.create(Participant, {
          groupId: group.id,
          ...participant,
        });
      });

      await manager.save(participants);

      return group;
    });
  }

  /**
   * Update a group's title
   * @param {string} id - Id of the group
   * @param {Object} updateGroupDto - Update group payload
   * @returns
   */
  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    // Using queryBuilder instead of findOneBy + save
    // To return the new row's full column
    const result = await this.groupRepository
      .createQueryBuilder()
      .update(Group)
      .set({
        title: updateGroupDto.title,
      })
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updatedGroup = result.raw?.[0] as Group;
    if (!updatedGroup) {
      throw new Error('Failed to update group');
    }

    return updatedGroup;
  }

  /**
   * Generate split summary (text form)
   * @param {string} groupId - Id of the group
   * @returns
   */
  async generateSplitTextSummary(groupId: string): Promise<string> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: [
        'participants',
        'expenses',
        'expenses.paidByParticipant',
        'expenses.expenseParticipants',
        'expenses.expenseParticipants.participant',
      ],
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`);
    }

    const participantsMap = new Map<
      string,
      {
        name: string;
        total: number;
        items: Record<string, { amount: number; quantity: number }>;
      }
    >();

    let totalExpenses = 0;
    const paidBySet = new Set<string>();
    const settlements: { from: string; to: string; amount: number }[] = [];

    for (const participant of group.participants) {
      participantsMap.set(participant.id, {
        name: participant.name,
        total: 0,
        items: {},
      });
    }

    for (const expense of group.expenses) {
      totalExpenses += Number(expense.amount);

      // Track who paid
      const payer = group.participants.find((p) => p.id === expense.paidBy);
      if (payer) {
        paidBySet.add(payer.name);
      }

      for (const ep of expense.expenseParticipants) {
        const pid = ep.participantId;
        const mapEntry = participantsMap.get(pid);
        if (!mapEntry) continue;

        mapEntry.total += Number(ep.share);

        // Use expense.title as item key
        if (!mapEntry.items[expense.title]) {
          mapEntry.items[expense.title] = {
            amount: Number(ep.share),
            quantity: 1,
          };
        } else {
          const item = mapEntry.items[expense.title];
          item.amount = Number(ep.share); // assume same amount per item
          item.quantity += 1;
        }
      }
    }

    // Calculate net balance (paid - share) for settlement
    const totalParticipants = group.participants.length;
    const sharePerParticipant = totalExpenses / totalParticipants;
    const balanceMap = new Map<string, number>(); // participant.name => net balance

    for (const participant of group.participants) {
      const paid = group.expenses
        .filter((e) => e.paidBy === participant.id)
        .reduce((sum, e) => sum + Number(e.amount), 0);

      const net = paid - sharePerParticipant;
      balanceMap.set(participant.name, net);
    }

    // Generate settlements from balances
    const creditors = Array.from(balanceMap.entries())
      .filter(([, val]) => val > 0)
      .map(([name, val]) => ({ name, amount: val }));

    const debtors = Array.from(balanceMap.entries())
      .filter(([, val]) => val < 0)
      .map(([name, val]) => ({ name, amount: -val }));

    for (const debtor of debtors) {
      for (const creditor of creditors) {
        if (debtor.amount === 0) break;
        const payAmount = Math.min(debtor.amount, creditor.amount);

        settlements.push({
          from: debtor.name,
          to: creditor.name,
          amount: payAmount,
        });

        debtor.amount -= payAmount;
        creditor.amount -= payAmount;
      }
    }

    // Build final summary
    const participantSummaries = Array.from(participantsMap.values()).map(
      (p) => ({
        name: p.name,
        total: p.total,
        items: Object.entries(p.items).map(([title, { amount, quantity }]) => ({
          title,
          amount,
          quantity,
        })),
      }),
    );

    const paidBy = Array.from(paidBySet);

    return this.generateSplitText({
      groupTitle: group.title,
      totalExpenses,
      participants: participantSummaries,
      paidBy,
      settlements,
    });
  }

  // ============================================
  // ============================================
  // ============================================

  // async create(createGroupDto: CreateGroupDto) {
  //   const result = await this.groupRepository
  //     .createQueryBuilder()
  //     .insert()
  //     .into(Group)
  //     .values({
  //       clientId: createGroupDto.clientId,
  //       title: createGroupDto.title,
  //     })
  //     .returning('*')
  //     .execute();

  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //   const insertedGroup = result.raw?.[0] as Group;
  //   if (!insertedGroup) {
  //     throw new Error('Failed to create group');
  //   }

  //   return insertedGroup;
  // }

  // In your GroupsService or controller
  async createGroupWithParticipants(
    groupDto: CreateGroupDto,
    participantsDto: CreateParticipantWithoutGroupIdDto[],
  ): Promise<Group> {
    return await this.groupRepository.manager.transaction(async (manager) => {
      // 1. Create the group
      const group = manager.create(Group, {
        clientId: groupDto.clientId,
        title: groupDto.title,
      });
      await manager.save(group); // Now we have group.id

      // 2. Create participants
      const participants = participantsDto.map((p) => {
        return manager.create(Participant, {
          ...p,
          groupId: group.id,
        });
      });

      await manager.save(participants);

      return group;
    });
  }

  async findAllWithSummary(clientId: string): Promise<GroupSummaryDto[]> {
    const qb = this.groupRepository
      .createQueryBuilder('g')
      .leftJoin(
        (qb) =>
          qb
            .select('e.group_id', 'group_id')
            .addSelect('COUNT(*)', 'expenses_count')
            .addSelect('COALESCE(SUM(e.amount), 0)', 'total_amount')
            .addSelect(
              'COALESCE(SUM(e.amount) FILTER (WHERE e.is_settled = false), 0)',
              'unsettled_amount',
            )
            .addSelect('BOOL_AND(e.is_settled)', 'is_fully_settled')
            .from('expenses', 'e')
            .groupBy('e.group_id'),
        'es',
        'es.group_id = g.id',
      )
      .leftJoin(
        (qb) =>
          qb
            .select('p.group_id', 'group_id')
            .addSelect('COUNT(*)', 'participants_count')
            .from('participants', 'p')
            .groupBy('p.group_id'),
        'ps',
        'ps.group_id = g.id',
      )
      .select('g.id', 'id')
      .addSelect('g.title', 'title')
      .addSelect('COALESCE(ps.participants_count, 0)', 'participantsCount')
      .addSelect('COALESCE(es.expenses_count, 0)', 'expensesCount')
      .addSelect('COALESCE(es.total_amount, 0)', 'totalAmount')
      .addSelect('COALESCE(es.unsettled_amount, 0)', 'unsettledAmount')
      .addSelect('COALESCE(es.is_fully_settled, true)', 'isFullySettled')
      .where('g.client_id = :clientId', { clientId });

    const raw = await qb.getRawMany<GroupSummaryRaw>();

    return raw.map(
      (row): GroupSummaryDto => ({
        id: row.id,
        title: row.title,
        participantsCount: Number(row.participantsCount),
        expensesCount: Number(row.expensesCount),
        totalAmount: Number(row.totalAmount),
        unsettledAmount: Number(row.unsettledAmount),
        isFullySettled:
          row.isFullySettled === true || row.isFullySettled === 'true',
      }),
    );
  }

  async findOneWithSummary(id: string): Promise<GroupSummaryDto> {
    const group = await this.groupRepository
      .createQueryBuilder('g')
      .leftJoin('g.participants', 'p')
      .leftJoin('g.expenses', 'e')
      .select('g.id', 'id')
      .addSelect('g.title', 'title')
      .addSelect('COUNT(DISTINCT p.id)', 'participantsCount')
      .addSelect('COUNT(DISTINCT e.id)', 'expensesCount')
      .addSelect('COALESCE(SUM(e.amount), 0)', 'totalAmount')
      .addSelect(
        'COALESCE(SUM(e.amount) FILTER (WHERE e.is_settled = false), 0)',
        'unsettledAmount',
      )
      .addSelect('BOOL_AND(e.is_settled)', 'isFullySettled')
      .where('g.id = :id', { id })
      .groupBy('g.id')
      .addGroupBy('g.title')
      .getRawOne<GroupSummaryDto>();

    if (!group) {
      throw new Error('Group not found');
    }

    return {
      id: group.id,
      title: group.title,
      participantsCount: group.participantsCount,
      expensesCount: group.expensesCount,
      totalAmount: group.totalAmount,
      unsettledAmount: group.unsettledAmount,
      isFullySettled: group.isFullySettled,
    };
  }

  async remove(id: string) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .delete()
      .from(Group)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const deletedGroup = result.raw?.[0] as Group;
    if (!deletedGroup) {
      throw new Error('Failed to delete group');
    }

    return deletedGroup;
  }

  private formatRupiah(value: number): string {
    return (
      'Rp' +
      value.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    );
  }

  private generateSplitText({
    groupTitle,
    totalExpenses,
    participants,
    paidBy,
    settlements,
  }: {
    groupTitle: string;
    totalExpenses: number;
    participants: {
      name: string;
      total: number;
      items: { title: string; amount: number; quantity: number }[];
    }[];
    paidBy: string[];
    settlements: { from: string; to: string; amount: number }[];
  }): string {
    const lines: string[] = [];

    lines.push(`💸 Split Summary for "${groupTitle}"\n`);
    lines.push(`Total Expenses: ${this.formatRupiah(totalExpenses)}`);
    lines.push(`Participants: ${participants.map((p) => p.name).join(', ')}\n`);

    for (const p of participants) {
      lines.push(`${p.name} = ${this.formatRupiah(p.total)}`);
      for (const item of p.items) {
        const qty = item.quantity > 1 ? ` (x${item.quantity})` : '';
        lines.push(
          `• ${item.title}${qty} ${this.formatRupiah(item.amount * item.quantity)}`,
        );
      }
      lines.push('');
    }

    lines.push('💳 Who Paid the Bill');
    for (const name of paidBy) {
      lines.push(`- ${name}`);
    }

    lines.push('\nWho Owes Whom');
    if (settlements.length === 0) {
      lines.push('- All settled! 🎉');
    } else {
      for (const s of settlements) {
        lines.push(`- ${s.from} owes ${s.to} ${this.formatRupiah(s.amount)}`);
      }
    }

    lines.push('\n== Report generated with Splitify');
    lines.push('== https://billo-splitbill.vercel.app/');

    return lines.join('\n');
  }
}

// ===== Helpers =====

function mapRawToGroupSummaryDto(raw: GroupSummaryRaw): GroupSummaryDto {
  return {
    id: raw.id,
    title: raw.title,
    participantsCount: Number(raw.participantsCount),
    expensesCount: Number(raw.expensesCount),
    totalAmount: Number(raw.totalAmount),
    unsettledAmount: Number(raw.unsettledAmount),
    isFullySettled:
      raw.isFullySettled === 'true' || raw.isFullySettled === true, // handle both
  };
}
