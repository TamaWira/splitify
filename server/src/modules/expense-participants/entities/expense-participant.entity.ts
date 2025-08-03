import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { Participant } from 'src/modules/participants/entities/participant.entity';
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

  @Column({ name: 'expense_id', type: 'uuid' })
  expenseId: string;

  @Column({ name: 'participant_id', type: 'uuid' })
  participantId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  share: number;

  // ===== Relations =====
  // expense_participants > expenses
  @ManyToOne(() => Expense, (expense) => expense.expenseParticipants, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

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
  participant: Participant;
}
