import { Expense } from 'src/expenses/entities/expense.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('expense_participants')
export class ExpenseParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // expense_participants > expenses
  @ManyToOne(() => Expense, (expense) => expense.expenseParticipants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'expense_id' })
  expenseId: Expense;

  // expense_participants > participants
  @ManyToOne(
    () => Participant,
    (participant) => participant.expenseParticipants,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'participant_id' })
  participantId: Participant;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  share: number;
}
