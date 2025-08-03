import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

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
}
