import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import databaseConfig from './config/database.config';
import { ExpenseParticipantsModule } from './expense-participants/expense_participants.module';
import { ExpensesModule } from './expenses/expenses.module';
import { GroupsModule } from './groups/groups.module';
import { ParticipantsModule } from './participants/participants.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ClientsModule,
    GroupsModule,
    ParticipantsModule,
    ExpensesModule,
    ExpenseParticipantsModule,
    LoggerModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'splitify_db',
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
