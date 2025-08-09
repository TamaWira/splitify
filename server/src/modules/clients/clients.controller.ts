import { Body, Controller, HttpStatus, Ip, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Client Id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The client id created',
    type: ClientDto,
  })
  async create(
    @Body() createClientDto: CreateClientDto,
    @Ip() ip: string,
  ): Promise<ClientDto> {
    return await this.clientsService.create({
      ...createClientDto,
      ipAddress: ip,
    });
  }
}
