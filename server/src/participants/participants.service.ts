import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './entities/participant.entity';
import { Repository } from 'typeorm';

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

  async findAll() {
    return await this.participantRepository.find();
  }

  async findOne(id: string) {
    return await this.participantRepository.findOneBy({ id });
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    const participant = await this.participantRepository.findOneBy({ id });
    if (!participant) {
      throw new Error('Participant not found');
    }

    await this.participantRepository.update(id, updateParticipantDto);
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
