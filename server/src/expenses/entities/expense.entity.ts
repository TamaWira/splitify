import { ExpenseParticipant } from 'src/expense_participants/entities/expense_participant.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // expenses < groups
  @ManyToOne(() => Group, (group) => group.expenses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  groupId: Group;

  // expenses < participants
  @ManyToOne(() => Participant, (participant) => participant.expenses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'paid_by' })
  paidBy: Participant;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'category', type: 'varchar', length: 255 })
  category: string;

  @Column({ name: 'is_settled', type: 'boolean', default: false })
  isSettled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== Relations =====
  // expense > expense_participants
  @OneToMany(
    () => ExpenseParticipant,
    (expenseParticipant) => expenseParticipant.expenseId,
  )
  expenseParticipants: ExpenseParticipant[];
}
