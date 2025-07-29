import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { ExpenseParticipant } from 'src/expense_participants/entities/expense_participant.entity';
import { ExpenseSummaryDto } from './dto/expense-summary.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const { participants, share, groupId, paidBy, ...rest } = createExpenseDto;

    return this.expenseRepository.manager.transaction(async (manager) => {
      const expense = manager.create(Expense, {
        ...rest,
        group: { id: groupId },
        paidBy: { id: paidBy },
      });

      await manager.save(expense);

      const expenseParticipants = participants.map((p) =>
        manager.create(ExpenseParticipant, {
          expenseId: { id: expense.id },
          participantId: { id: p },
          share,
        }),
      );

      await manager.save(expenseParticipants);

      return expense;
    });
  }

  async findAll(filter: FilterExpenseDto) {
    const {
      groupId,
      paidBy,
      category,
      isSettled,
      page = 1,
      limit = 10,
    } = filter;

    const query = this.expenseRepository.createQueryBuilder('expense');

    if (groupId) {
      query.andWhere('expense.groupId = :groupId', { groupId });
    }

    if (paidBy) {
      query.andWhere('expense.paidBy = :paidBy', { paidBy });
    }

    if (category) {
      query.andWhere('expense.category ILIKE :category', {
        category: `%${category}%`,
      });
    }

    if (isSettled !== undefined) {
      query.andWhere('expense.isSettled = :isSettled', {
        isSettled: isSettled === 'true',
      });
    }

    query
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('expense.createdAt', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      pageCount: Math.ceil(total / limit),
    };
  }

  async findByGroupIdWithSummaries(
    groupId: string,
  ): Promise<ExpenseSummaryDto[]> {
    return await this.expenseRepository
      .createQueryBuilder('e')
      .leftJoin('e.paidBy', 'p_paid_by')
      .leftJoin('e.expenseParticipants', 'ep')
      .select('e.title', 'title')
      .addSelect('e.amount', 'total_amount')
      .addSelect('e.category', 'category')
      .addSelect('p_paid_by.name', 'paid_by')
      .addSelect('COUNT(ep.id)', 'participants_count')
      .where('e.groupId = :groupId', { groupId })
      .groupBy('e.id')
      .addGroupBy('p_paid_by.name')
      .getRawMany();
  }

  async findOne(id: string) {
    return await this.expenseRepository.findOneBy({ id });
  }

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
