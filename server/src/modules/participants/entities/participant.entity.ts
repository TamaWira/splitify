import { ExpenseParticipant } from 'src/modules/expense-participants/entities/expense-participant.entity';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
import { Group } from 'src/modules/groups/entities/group.entity';
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

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'group_id', type: 'uuid' })
  groupId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== Relations =====
  // participants > groups
  @ManyToOne(() => Group, (group) => group.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  // participants < expenses
  @OneToMany(() => Expense, (expense) => expense.paidByParticipant)
  expenses: Expense[];

  // participants < expense_participants
  @OneToMany(
    () => ExpenseParticipant,
    (expenseParticipant) => expenseParticipant.participant,
  )
  expenseParticipants: ExpenseParticipant[];
}
