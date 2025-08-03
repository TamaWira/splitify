import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto, @Ip() ip: string) {
    return await this.clientsService.create({
      ...createClientDto,
      ipAddress: ip,
    });
  }
}
