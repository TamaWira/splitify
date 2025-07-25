import { Injectable } from '@nestjs/common';
import { CreateExpenseParticipantDto } from './dto/create-expense_participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense_participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseParticipant } from './entities/expense_participant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseParticipantsService {
  constructor(
    @InjectRepository(ExpenseParticipant)
    private expenseParticipantRepository: Repository<ExpenseParticipant>,
  ) {}

  async create(createExpenseParticipantDto: CreateExpenseParticipantDto) {
    const result = await this.expenseParticipantRepository
      .createQueryBuilder()
      .insert()
      .into(ExpenseParticipant)
      .values(createExpenseParticipantDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedExpenseParticipant = result.raw?.[0] as ExpenseParticipant;
    if (!insertedExpenseParticipant) {
      throw new Error('Failed to create expense participant');
    }

    return insertedExpenseParticipant;
  }

  async findAll() {
    return await this.expenseParticipantRepository.find();
  }

  async findOne(id: string) {
    return await this.expenseParticipantRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateExpenseParticipantDto: UpdateExpenseParticipantDto,
  ) {
    const result = await this.expenseParticipantRepository
      .createQueryBuilder()
      .update(ExpenseParticipant)
      .set(updateExpenseParticipantDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updatedExpenseParticipant = result.raw?.[0] as ExpenseParticipant;
    if (!updatedExpenseParticipant) {
      throw new Error('Failed to update expense participant');
    }

    return updatedExpenseParticipant;
  }

  async remove(id: string) {
    const result = await this.expenseParticipantRepository
      .createQueryBuilder()
      .delete()
      .from(ExpenseParticipant)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const deletedExpenseParticipant = result.raw?.[0] as ExpenseParticipant;
    if (!deletedExpenseParticipant) {
      throw new Error('Failed to delete expense participant');
    }

    return deletedExpenseParticipant;
  }
}
