import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create() {
    const uuid = uuidv4();
    const result = await this.clientRepository
      .createQueryBuilder()
      .insert()
      .into(Client)
      .values({ id: uuid })
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
