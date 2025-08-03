import { OmitType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from 'src/modules/participants/dto/create-participant.dto';

export class CreateParticipantInGroupDto extends OmitType(
  CreateParticipantDto,
  ['groupId'] as const,
) {}
