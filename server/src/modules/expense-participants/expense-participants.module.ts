import { Module } from '@nestjs/common';
import { ExpenseParticipantsService } from './expense-participants.service';
import { ExpenseParticipantsController } from './expense-participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseParticipant } from './entities/expense-participant.entity';
import { Participant } from '../participants/entities/participant.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseParticipant, Participant, Expense]),
  ],
  controllers: [ExpenseParticipantsController],
  providers: [ExpenseParticipantsService],
  exports: [ExpenseParticipantsService],
})
export class ExpenseParticipantsModule {}
