import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const result = await this.clientRepository
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values(createClientDto)
      .returning('*')
      .execute();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const insertedClient = result.raw?.[0] as Client;
    if (!insertedClient) {
      throw new Error('Failed to create client');
    }

    return insertedClient;
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: string) {
    return await this.clientRepository.findOneBy({ id });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new Error('Client not found');
    }

    await this.clientRepository.update(id, updateClientDto);
    return await this.clientRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new Error('Client not found');
    }

    await this.clientRepository.delete(id);
    return client;
  }
}
