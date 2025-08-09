import { Group } from 'src/modules/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'device_type', type: 'varchar', length: 255 })
  deviceType: string;

  @Column({ nullable: true, name: 'device_name', type: 'varchar', length: 255 })
  deviceName: string;

  @Column({ nullable: true, name: 'os_name', type: 'varchar', length: 255 })
  osName: string;

  @Column({ nullable: true, name: 'os_version', type: 'varchar', length: 255 })
  osVersion: string;

  @Column({
    nullable: true,
    name: 'browser_name',
    type: 'varchar',
    length: 255,
  })
  browserName: string;

  @Column({
    nullable: true,
    name: 'browser_version',
    type: 'varchar',
    length: 255,
  })
  browserVersion: string;

  @Column({
    nullable: true,
    name: 'user_agent',
    type: 'varchar',
    length: 255,
  })
  userAgent: string;

  @Column({
    nullable: true,
    name: 'screen_resolution',
    type: 'varchar',
    length: 255,
  })
  screenResolution: string;

  @Column({ nullable: true, name: 'language', type: 'varchar', length: 255 })
  language: string;

  @Column({ nullable: true, name: 'timezone', type: 'varchar', length: 255 })
  timezone: string;

  @Column({ nullable: true, name: 'ip_address', type: 'varchar', length: 255 })
  ipAddress: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // ===== Relations =====
  // clients - one-to-many - groups
  @OneToMany(() => Group, (groups) => groups.clientId)
  groups: Group[];
}
