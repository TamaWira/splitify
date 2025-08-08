import { ExpenseParticipant } from 'src/modules/expense-participants/entities/expense-participant.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
import { Participant } from 'src/modules/participants/entities/participant.entity';
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

  // Foreign Key
  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  // Foreign Key
  @Column({ name: 'paid_by', type: 'uuid' })
  paidBy: string;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
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
  // expenses > participants
  @ManyToOne(() => Participant, (participant) => participant.expenses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'paid_by' })
  paidByParticipant: Participant;

  // expenses > groups
  @ManyToOne(() => Group, (group) => group.expenses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  // expense < expense_participants
  @OneToMany(
    () => ExpenseParticipant,
    (expenseParticipant) => expenseParticipant.expense,
  )
  expenseParticipants: ExpenseParticipant[];
}
