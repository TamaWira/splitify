import { OmitType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';

export class CreateParticipantWithoutGroupIdDto extends OmitType(
  CreateParticipantDto,
  ['groupId'] as const,
) {}
