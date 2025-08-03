import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { ParticipantsModule } from '../participants/participants.module';
import { ExpenseParticipantsModule } from '../expense-participants/expense-participants.module';
import { ExpensesModule } from '../expenses/expenses.module';

@Module({
  imports: [
    ParticipantsModule,
    ExpenseParticipantsModule,
    ExpensesModule,
    TypeOrmModule.forFeature([Group]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
