import { Group } from 'src/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'device_type' })
  deviceType: string;

  @Column({ nullable: true, name: 'device_name' })
  deviceName: string;

  @Column({ nullable: true, name: 'os_name' })
  osName: string;

  @Column({ nullable: true, name: 'os_version' })
  osVersion: string;

  @Column({ nullable: true, name: 'browser_name' })
  browserName: string;

  @Column({ nullable: true, name: 'browser_version' })
  browserVersion: string;

  @Column({ nullable: true, type: 'text', name: 'user_agent' })
  userAgent: string;

  @Column({ nullable: true, name: 'screen_resolution' })
  screenResolution: string;

  @Column({ nullable: true, name: 'language' })
  language: string;

  @Column({ nullable: true, name: 'timezone' })
  timezone: string;

  @Column({ nullable: true, name: 'ip_address' })
  ipAddress: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // ===== Relations =====
  // clients - one-to-many - groups
  @OneToMany(() => Group, (groups) => groups.client)
  groups: Group[];
}
