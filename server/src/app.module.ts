import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmRuntimeOptions } from './common/config/database.config';
import { LoggerModule } from './common/logger/logger.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ExpenseParticipantsModule } from './modules/expense-participants/expense-participants.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ParticipantsModule } from './modules/participants/participants.module';

@Module({
  imports: [
    ClientsModule,
    GroupsModule,
    ParticipantsModule,
    ExpensesModule,
    ExpenseParticipantsModule,
    LoggerModule,
    TypeOrmModule.forRoot(typeOrmRuntimeOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
