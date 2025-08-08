import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'device_type', type: 'varchar', length: 255 })
  deviceType: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'device_name', type: 'varchar', length: 255 })
  deviceName: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'os_name', type: 'varchar', length: 255 })
  osName: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'os_version', type: 'varchar', length: 255 })
  osVersion: string;

  @ApiProperty()
  @Column({
    nullable: true,
    name: 'browser_name',
    type: 'varchar',
    length: 255,
  })
  browserName: string;

  @ApiProperty()
  @Column({
    nullable: true,
    name: 'browser_version',
    type: 'varchar',
    length: 255,
  })
  browserVersion: string;

  @ApiProperty()
  @Column({
    nullable: true,
    name: 'user_agent',
    type: 'varchar',
    length: 255,
  })
  userAgent: string;

  @ApiProperty()
  @Column({
    nullable: true,
    name: 'screen_resolution',
    type: 'varchar',
    length: 255,
  })
  screenResolution: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'language', type: 'varchar', length: 255 })
  language: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'timezone', type: 'varchar', length: 255 })
  timezone: string;

  @ApiProperty()
  @Column({ nullable: true, name: 'ip_address', type: 'varchar', length: 255 })
  ipAddress: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty()
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
