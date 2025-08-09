import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';
import { CreateParticipantDto } from 'src/modules/participants/dto/create-participant.dto';

type ParticipantWithoutGroupId = Omit<CreateParticipantDto, 'groupId'>;

export class CreateGroupDto {
  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  participants: ParticipantWithoutGroupId[];
}
