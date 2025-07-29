import { Client } from 'src/clients/entities/client.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
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

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // groups - many-to-one - clients
  @ManyToOne(() => Client, (client) => client.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  clientId: Client;

  @Column()
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== Relations =====
  // groups - one-to-many - participants
  @OneToMany(() => Participant, (participants) => participants.groupId)
  participants: Participant[];

  // groups - one-to-many - expenses
  @OneToMany(() => Expense, (expenses) => expenses.groupId)
  expenses: Expense[];
}
