import { Client } from 'src/modules/clients/entities/client.entity';
import { Expense } from 'src/modules/expenses/entities/expense.entity';
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

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // ===== Relations =====
  // groups > clients
  @ManyToOne(() => Client, (client) => client.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // groups < participants
  @OneToMany(() => Participant, (participants) => participants.group)
  participants: Participant[];

  // groups < expenses
  @OneToMany(() => Expense, (expenses) => expenses.group)
  expenses: Expense[];
}
