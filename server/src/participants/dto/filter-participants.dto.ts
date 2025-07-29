import { IsOptional, IsUUID } from 'class-validator';

export class FilterParticipantsDto {
  @IsOptional()
  @IsUUID()
  groupId: string;
}
