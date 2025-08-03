import { ArrayNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';
import { CreateParticipantDto } from 'src/modules/participants/dto/create-participant.dto';

export class CreateGroupDto {
  @IsUUID()
  clientId: string;

  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  participants: Omit<CreateParticipantDto, 'groupId'>[];
}
