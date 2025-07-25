import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .insert()
      .into(Group)
      .values(createGroupDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedGroup = result.raw?.[0] as Group;
    if (!insertedGroup) {
      throw new Error('Failed to create group');
    }

    return insertedGroup;
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: string) {
    return await this.groupRepository.findOneBy({ id });
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .update(Group)
      .set(updateGroupDto)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const updatedGroup = result.raw?.[0] as Group;
    if (!updatedGroup) {
      throw new Error('Failed to update group');
    }

    return updatedGroup;
  }

  async remove(id: string) {
    const result = await this.groupRepository
      .createQueryBuilder()
      .delete()
      .from(Group)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const deletedGroup = result.raw?.[0] as Group;
    if (!deletedGroup) {
      throw new Error('Failed to delete group');
    }

    return deletedGroup;
  }
}
