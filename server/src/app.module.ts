import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from './groups/groups.module';
import { ParticipantsModule } from './participants/participants.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpenseParticipantsModule } from './expense-participants/expense_participants.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ClientsModule,
    GroupsModule,
    ParticipantsModule,
    ExpensesModule,
    ExpenseParticipantsModule,

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

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
