import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import databaseConfig from './common/config/database.config';
import { LoggerModule } from './common/logger/logger.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ParticipantsModule } from './modules/participants/participants.module';
import { ExpenseParticipantsModule } from './modules/expense-participants/expense-participants.module';

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
