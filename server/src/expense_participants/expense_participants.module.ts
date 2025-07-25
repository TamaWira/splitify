import { Module } from '@nestjs/common';
import { ExpenseParticipantsService } from './expense_participants.service';
import { ExpenseParticipantsController } from './expense_participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseParticipant } from './entities/expense_participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseParticipant])],
  controllers: [ExpenseParticipantsController],
  providers: [ExpenseParticipantsService],
})
export class ExpenseParticipantsModule {}
