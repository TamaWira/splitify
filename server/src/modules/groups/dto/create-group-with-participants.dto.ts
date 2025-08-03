import { Type as TransformType } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { CreateParticipantWithoutGroupIdDto } from 'src/modules/participants/dto/create-participant-without-group-id.dto';
import { CreateGroupDto } from './create-group.dto';

export class CreateGroupWithParticipantsDto {
  @ValidateNested()
  @TransformType(() => CreateGroupDto)
  group: CreateGroupDto;

  @IsArray()
  @ValidateNested({ each: true })
  @TransformType(() => CreateParticipantWithoutGroupIdDto)
  participants: CreateParticipantWithoutGroupIdDto[];
}
