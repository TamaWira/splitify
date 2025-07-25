import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const result = await this.expenseRepository
      .createQueryBuilder()
      .insert()
      .into(Expense)
      .values(createExpenseDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedExpense = result.raw?.[0] as Expense;
    if (!insertedExpense) {
      throw new Error('Failed to create expense');
    }

    return insertedExpense;
  }

  async findAll() {
    return await this.expenseRepository.find();
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
