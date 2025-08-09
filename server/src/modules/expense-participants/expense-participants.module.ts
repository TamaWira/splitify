import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../expenses/entities/expense.entity';
import { Participant } from '../participants/entities/participant.entity';
import { ExpenseParticipant } from './entities/expense-participant.entity';
import { ExpenseParticipantsService } from './expense-participants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseParticipant, Participant, Expense]),
  ],
  providers: [ExpenseParticipantsService],
  exports: [ExpenseParticipantsService],
})
export class ExpenseParticipantsModule {}
