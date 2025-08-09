import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ExpenseParticipant } from '../expense-participants/entities/expense-participant.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseSummaryDto } from './dto/expense-summary.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseWithParticipantsDto } from './dto/expense-with-participants.dto';
import { ExpenseParticipantDto } from '../expense-participants/dto/expense-participant.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  /**
   * Get list of expenses by group id and filters
   * @param filter
   * @returns
   */
  async findAll(filter: FilterExpenseDto): Promise<ExpenseSummaryDto[]> {
    const { groupId } = filter;

    const query = this.expenseRepository.createQueryBuilder('e');

    query
      .leftJoin('e.paidByParticipant', 'p_paid_by')
      .leftJoin('e.expenseParticipants', 'ep')
      .select('e.title', 'title')
      .addSelect('e.id', 'id')
      .addSelect('e.groupId', 'groupId')
      .addSelect('e.amount', 'totalAmount')
      .addSelect('e.category', 'category')
      .addSelect('p_paid_by.name', 'paidBy')
      .addSelect('COUNT(ep.id)', 'participantsCount')
      .where('e.group_id = :groupId', { groupId })
      .groupBy('e.id')
      .addGroupBy('p_paid_by.name');

    const rawResults = await query.getRawMany<ExpenseSummaryDto>();

    return rawResults.map((raw) => ({
      id: raw.id,
      title: raw.title,
      groupId: raw.groupId,
      totalAmount: Number(raw.totalAmount),
      category: raw.category,
      paidBy: raw.paidBy,
      participantsCount: Number(raw.participantsCount),
    }));
  }

  async findOneWithParticipants(
    expenseId: string,
  ): Promise<ExpenseWithParticipantsDto> {
    const expense = await this.expenseRepository.findOne({
      where: { id: expenseId },
      relations: { expenseParticipants: true },
    });

    if (!expense) throw new NotFoundException('Expense not found');

    const participants: ExpenseParticipantDto[] = (
      expense.expenseParticipants ?? []
    ).map((ep) => ({
      id: ep.id,
      expenseId: ep.expenseId,
      participantId: ep.participantId,
      share: Number(ep.share),
    }));

    return {
      id: expense.id,
      groupId: expense.groupId,
      title: expense.title,
      amount: Number(expense.amount),
      isSettled: expense.isSettled,
      paidBy: expense.paidBy,
      category: expense.category,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      participants,
    };
  }

  /**
   * Create individual expense
   * @param createExpenseDto - create expense body request
   * @returns
   */
  async create(createExpenseDto: CreateExpenseDto) {
    const { participants, groupId, paidBy, ...rest } = createExpenseDto;

    const share = Math.round(createExpenseDto.amount / participants.length);

    return this.expenseRepository.manager.transaction(async (manager) => {
      const expense = manager.create(Expense, {
        ...rest,
        groupId: groupId,
        paidBy: paidBy,
        share,
      });

      await manager.save(expense);

      const expenseParticipants = participants.map((p) =>
        manager.create(ExpenseParticipant, {
          expenseId: expense.id,
          participantId: p,
          share,
        }),
      );

      await manager.save(expenseParticipants);

      return { expense, expenseParticipants };
    });
  }

  /**
   * Update existing expense and its participants
   * @param {string} expenseId - Id of the expense
   * @param {Object} updateDto - Update expense Dto
   * @returns
   */
  async updateExpenseWithParticipants(
    expenseId: string,
    updateDto: UpdateExpenseDto,
  ): Promise<ExpenseWithParticipantsDto> {
    const { participants, ...expenseData } = updateDto;

    // Validate existing expense
    const existingExpense = await this.expenseRepository.findOne({
      where: { id: expenseId },
    });

    if (!existingExpense) {
      throw new NotFoundException('Expense not found');
    }

    return await this.expenseRepository.manager.transaction(async (manager) => {
      // Update the Expense
      await manager.update(Expense, expenseId, expenseData);

      // Get current participants in DB
      const current = await manager.find(ExpenseParticipant, {
        where: { expenseId },
      });

      if (participants) {
        const incomingIds = participants.map((p) => p);
        const currentIds = current.map((p) => p.participantId);

        // Determine who to add, update, and delete
        const toDelete = current.filter(
          (p) => !incomingIds.includes(p.participantId),
        );

        const toAdd = participants.filter((p) => !currentIds.includes(p));

        const toUpdate = current.filter((p) =>
          incomingIds.includes(p.participantId),
        );

        const share = Math.round(
          (updateDto.amount ?? existingExpense.amount) / participants.length,
        );

        // 4. Delete removed participants
        if (toDelete.length > 0) {
          await manager.delete(ExpenseParticipant, {
            id: In(toDelete.map((p) => p.id)),
          });
        }

        // 5. Update existing participants' share
        for (const p of toUpdate) {
          await manager.update(ExpenseParticipant, p.id, { share });
        }

        // 6. Add new participants
        const newParticipants = toAdd.map((p) =>
          manager.create(ExpenseParticipant, {
            expenseId,
            participantId: p,
            share,
          }),
        );
        await manager.save(newParticipants);
      }

      const updated = await manager.findOneOrFail(Expense, {
        where: { id: expenseId },
        relations: ['expenseParticipants', 'expenseParticipants.participant'],
      });

      return {
        id: updated.id,
        title: updated.title,
        amount: Number(updated.amount),
        category: updated.category,
        isSettled: updated.isSettled,
        groupId: updated.groupId,
        paidBy: updated.paidBy,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        participants: updated.expenseParticipants.map((ep) => ({
          id: ep.participant.id,
          expenseId: ep.expenseId,
          participantId: ep.participantId,
          share: Number(ep.share),
        })),
      };
    });
  }
}
