import { Body, Controller, HttpStatus, Ip, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Client } from './entities/client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Client Id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The client id created',
    type: Client,
  })
  async create(
    @Body() createClientDto: CreateClientDto,
    @Ip() ip: string,
  ): Promise<Client> {
    return await this.clientsService.create({
      ...createClientDto,
      ipAddress: ip,
    });
  }
}
