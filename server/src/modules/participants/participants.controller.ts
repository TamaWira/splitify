import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantsService } from './participants.service';
import { ParticipantDto } from './dto/participant.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Participant successfully fetched',
    type: ParticipantDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Participant not found',
  })
  findOne(@Param('id') id: string): Promise<ParticipantDto> {
    return this.participantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant by Id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Participant successfully updated',
    type: ParticipantDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Participant not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<ParticipantDto> {
    return this.participantsService.update(id, updateParticipantDto);
  }

  @ApiOperation({ summary: 'Delete a participant by Id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Participant successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Participant not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
