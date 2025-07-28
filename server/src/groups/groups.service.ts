import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateParticipantWithoutGroupIdDto } from 'src/participants/dto/create-participant-without-group-id.dto';
import { Participant } from 'src/participants/entities/participant.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupSummaryDto } from './dto/group-summary.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .insert()
      .into(Group)
      .values(createGroupDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedGroup = result.raw?.[0] as Group;
    if (!insertedGroup) {
      throw new Error('Failed to create group');
    }

    return insertedGroup;
  }

  // In your GroupsService or controller
  async createGroupWithParticipants(
    groupDto: CreateGroupDto,
    participantsDto: CreateParticipantWithoutGroupIdDto[],
  ): Promise<Group> {
    return await this.groupRepository.manager.transaction(async (manager) => {
      // 1. Create the group
      const group = manager.create(Group, groupDto);
      await manager.save(group); // Now we have group.id

      // 2. Create participants
      const participants = participantsDto.map((p) => {
        return manager.create(Participant, {
          ...p,
          groupId: group.id, // or groupId: group.id
        });
      });

      await manager.save(participants);

      return group;
    });
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findAllWithSummary(clientId: string): Promise<GroupSummaryDto[]> {
    return await this.groupRepository
      .createQueryBuilder('g')
      .leftJoin('g.participants', 'p')
      .leftJoin('g.expenses', 'e')
      .select('g.id', 'id')
      .addSelect('g.title', 'title')
      .addSelect('COUNT(DISTINCT p.id)', 'participantCount')
      .addSelect('COUNT(DISTINCT e.id)', 'expenseCount')
      .addSelect('COALESCE(SUM(e.amount), 0)', 'totalAmount')
      .addSelect(
        'COALESCE(SUM(e.amount) FILTER (WHERE e.is_settled = false), 0)',
        'unsettledAmount',
      )
      .addSelect('BOOL_AND(e.is_settled)', 'isFullySettled')
      .where('g.client_id = :clientId', { clientId })
      .groupBy('g.id')
      .addGroupBy('g.title')
      .getRawMany();
  }

  async findOne(id: string) {
    return await this.groupRepository.findOneBy({ id });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .update(Group)
      .set(updateGroupDto)
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
}
