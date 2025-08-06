import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseParticipant } from '../expense-participants/entities/expense-participant.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseSummaryDto } from './dto/expense-summary.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { Expense } from './entities/expense.entity';

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
}
