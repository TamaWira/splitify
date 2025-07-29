import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Repository } from 'typeorm';
import { FilterParticipantsDto } from './dto/filter-participants.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    const result = await this.participantRepository
      .createQueryBuilder()
      .insert()
      .into(Participant)
      .values({
        groupId: { id: createParticipantDto.groupId },
        name: createParticipantDto.name,
        email: createParticipantDto.email,
      })
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedParticipant = result.raw?.[0] as Participant;
    if (!insertedParticipant) {
      throw new Error('Failed to create participant');
    }

    return insertedParticipant;
  }

  async findAll(filter: FilterParticipantsDto): Promise<Participant[]> {
    const { groupId } = filter;

    const query = this.participantRepository.createQueryBuilder('participant');

    if (groupId) {
      query.andWhere('participant.groupId = :groupId', { groupId });
    }

    const data = await query.getMany();

    return data;
  }

  async findOne(id: string) {
    return await this.participantRepository.findOneBy({ id });
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new Error('Participant not found');
    }

    await this.participantRepository.update(id, {
      groupId: { id: updateParticipantDto.groupId },
      name: updateParticipantDto.name,
      email: updateParticipantDto.email,
    });
    return await this.participantRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new Error('Participant not found');
    }

    await this.participantRepository.delete(id);
    return participant;
  }
}
