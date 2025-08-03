import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseDto } from './dto/expense-basic.dto';
import { ExpenseSummaryDto } from './dto/expense-summary.dto';
import { ExpenseWithParticipantsDto } from './dto/expense-with-participants.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { FilterFindOneExpenseDto } from './dto/filter-find-one-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpenseParticipant } from '../expense-participants/entities/expense-participant.entity';

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
  async findAll(
    filter: FilterExpenseDto,
  ): Promise<(Expense | ExpenseSummaryDto)[]> {
    const { groupId, withSummary } = filter;

    const query = this.expenseRepository.createQueryBuilder('e');

    if (groupId) {
      query.andWhere('e.groupId = :groupId', { groupId });
    }

    if (withSummary) {
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
        .groupBy('e.id')
        .addGroupBy('p_paid_by.name');
    }

    return await query.getRawMany();
  }

  /**
   * Create individual expense
   * @param createExpenseDto - create expense body request
   * @returns
   */
  async create(createExpenseDto: CreateExpenseDto) {
    const { participants, share, groupId, paidBy, ...rest } = createExpenseDto;

    return this.expenseRepository.manager.transaction(async (manager) => {
      const expense = manager.create(Expense, {
        ...rest,
        groupId: groupId,
        paidBy: paidBy,
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

      return expense;
    });
  }

  // =============================================
  // =============================================
  // =============================================

  /**
   * Get a single expense (plain)
   * @param id
   * @param filter
   * @returns
   */
  async findOne(
    id: string,
    filter: FilterFindOneExpenseDto,
  ): Promise<ExpenseDto | ExpenseWithParticipantsDto> {
    const { includeParticipants } = filter;

    const relations = includeParticipants
      ? ['expenseParticipants', 'expenseParticipants.participant']
      : [];

    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations,
    });

    if (!expense) throw new NotFoundException();

    const base: ExpenseDto = {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      isSettled: expense.isSettled,
      groupId: expense.groupId,
      paidBy: expense.paidBy,
      createdAt: expense.createdAt,
    };

    if (!includeParticipants) return base;

    return {
      ...base,
      participants: expense.expenseParticipants.map((ep) => ({
        id: ep.participant.id,
        name: ep.participant.name,
        share: ep.share,
      })),
    };
  }

  /**
   * Get a single expense (with summary)
   * @param groupId
   * @returns
   */
  async findByGroupIdWithSummaries(
    groupId: string,
  ): Promise<ExpenseSummaryDto[]> {
    return await this.expenseRepository
      .createQueryBuilder('e')
      .leftJoin('e.paidByParticipant', 'p_paid_by')
      .leftJoin('e.expenseParticipants', 'ep')
      .select('e.title', 'title')
      .addSelect('e.id', 'id')
      .addSelect('e.groupId', 'groupId')
      .addSelect('e.amount', 'totalAmount')
      .addSelect('e.category', 'category')
      .addSelect('p_paid_by.name', 'paidBy')
      .addSelect('COUNT(ep.id)', 'participantsCount')
      .where('e.groupId = :groupId', { groupId })
      .groupBy('e.id')
      .addGroupBy('p_paid_by.name')
      .getRawMany();
  }

  /**
   * Get a single expense (with its participants)
   * @param id
   * @returns
   */
  async findOneWithParticipants(
    id: string,
  ): Promise<ExpenseWithParticipantsDto> {
    const expense = (await this.expenseRepository
      .createQueryBuilder('e')
      .leftJoin('e.paidBy', 'p_paid_by')
      .leftJoin('e.expenseParticipants', 'ep')
      .select('e.title', 'title')
      .addSelect('e.id', 'id')
      .addSelect('e.groupId', 'groupId')
      .addSelect('e.amount', 'totalAmount')
      .addSelect('e.category', 'category')
      .addSelect('p_paid_by.name', 'paidBy')
      .addSelect('ep', 'participants')
      .where('e.id = :id', { id })
      .groupBy('e.id')
      .addGroupBy('p_paid_by.name')
      .getRawOne()) as ExpenseWithParticipantsDto;

    if (!expense) throw new NotFoundException();

    return expense;
  }

  /**
   * Update a single expense
   * @param id
   * @param updateExpenseDto
   * @returns
   */
  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const result = await this.expenseRepository
      .createQueryBuilder()
      .update(Expense)
      .set(updateExpenseDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updatedExpense = result.raw?.[0] as Expense;
    if (!updatedExpense) {
      throw new Error('Failed to update expense');
    }

    return updatedExpense;
  }

  /**
   * Remove a single expense
   * @param id
   * @returns
   */
  async remove(id: string) {
    const result = await this.expenseRepository
      .createQueryBuilder()
      .delete()
      .from(Expense)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const deletedExpense = result.raw?.[0] as Expense;
    if (!deletedExpense) {
      throw new Error('Failed to delete expense');
    }

    return deletedExpense;
  }
}
