import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Get list of participants
   * @param {Object} query - Queries
   * @param {string} query.groupId - Group Id of the participants
   * @returns
   */
  async findAll(query: FilterParticipantsDto): Promise<Participant[]> {
    const { groupId } = query;

    const qb = this.participantRepository.createQueryBuilder('participant');

    if (groupId) {
      qb.andWhere('participant.groupId = :groupId', { groupId });
    }

    const data = await qb.getMany();

    return data;
  }

  /**
   * Get a single participant
   * @param {string} id - Id of the participant
   * @returns
   */
  async findOne(id: string) {
    return await this.participantRepository.findOneBy({ id });
  }

  /**
   * Create a single participant
   * @param {Object} createParticipantDto - Create participant payload
   * @returns
   */
  async create(createParticipantDto: CreateParticipantDto) {
    const result = await this.participantRepository
      .createQueryBuilder()
      .insert()
      .into(Participant)
      .values(createParticipantDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedParticipant = result.raw?.[0] as Participant;
    if (!insertedParticipant) {
      throw new Error('Failed to create participant');
    }

    return insertedParticipant;
  }

  /**
   * Update a single participant
   * @param {string} id - Id  of the participant
   * @param {Object} updateParticipantDto - Update participant payload
   * @returns
   */
  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new NotFoundException();
    }

    await this.participantRepository.update(id, updateParticipantDto);
    return await this.participantRepository.findOneBy({ id });
  }

  /**
   * Delete a single participant
   * @param {string} id - Id of the participant
   * @returns
   */
  async remove(id: string) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new NotFoundException();
    }

    await this.participantRepository.delete(id);
    return participant;
  }
}
