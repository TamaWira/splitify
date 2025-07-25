import { Expense } from 'src/expenses/entities/expense.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExpenseParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expense_id', type: 'uuid' })
  expenseId: string;

  @Column({ name: 'participant_id', type: 'uuid' })
  participantId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  share: number;

  @ManyToOne(() => Expense)
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @ManyToOne(() => Participant)
  @JoinColumn({ name: 'participant_id' })
  participant: Participant;
}
