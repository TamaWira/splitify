import { Injectable } from '@nestjs/common';
import { CreateExpenseParticipantDto } from './dto/create-expense_participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense_participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseParticipant } from './entities/expense-participant.entity';
import { Repository } from 'typeorm';
import { Participant } from '../participants/entities/participant.entity';
import { Expense } from '../expenses/entities/expense.entity';
import { SplitSummaryDto } from './dto/split-summary.dto';

@Injectable()
export class ExpenseParticipantsService {
  constructor(
    @InjectRepository(ExpenseParticipant)
    private expenseParticipantRepository: Repository<ExpenseParticipant>,

    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,

    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async getSplitSummary(groupId: string): Promise<SplitSummaryDto[]> {
    const participants = await this.participantRepository.find({
      where: { groupId },
      relations: ['expenseParticipants'], // assuming participant has user.name or similar
    });

    const expenses = await this.expenseRepository.find({
      where: { groupId },
      relations: ['expenseParticipants'], // to access how much each owes
    });

    const summaryMap = new Map<
      string,
      { name: string; paid: number; owes: number }
    >();

    // Initialize each participant
    for (const p of participants) {
      summaryMap.set(p.id, {
        name: p.name, // or p.user.name depending on your model
        paid: 0,
        owes: 0,
      });
    }

    for (const expense of expenses) {
      const totalAmount = Number(expense.amount);
      const payerId = expense.paidBy;

      // Add paid amount
      const payer = summaryMap.get(payerId);
      if (payer) {
        payer.paid += totalAmount;
      }

      // Split amount among expense participants
      const shares = expense.expenseParticipants.length;
      const sharePerPerson = totalAmount / shares;

      for (const ep of expense.expenseParticipants) {
        const p = summaryMap.get(ep.participantId);
        if (p) {
          p.owes += sharePerPerson;
        }
      }
    }

    // Transform to final summary
    const result: SplitSummaryDto[] = [];

    for (const [id, data] of summaryMap.entries()) {
      const net = data.paid - data.owes;

      if (net === 0) continue; // skip fully settled

      result.push({
        participantId: id,
        participantName: data.name,
        category: net > 0 ? 'gets' : 'owes',
        amount: Math.abs(net),
      });
    }

    return result;
  }

  // ==========================================
  // ==========================================
  // ==========================================

  async create(createExpenseParticipantDto: CreateExpenseParticipantDto) {
    const result = await this.expenseParticipantRepository
      .createQueryBuilder()
      .insert()
      .into(ExpenseParticipant)
      .values({
        expenseId: createExpenseParticipantDto.expenseId,
        participantId: createExpenseParticipantDto.participantId,
        share: createExpenseParticipantDto.share,
      })
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
      .set({
        expenseId: updateExpenseParticipantDto.expenseId,
        participantId: updateExpenseParticipantDto.participantId,
        share: updateExpenseParticipantDto.share,
      })
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
