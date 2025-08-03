import { IsOptional, IsUUID } from 'class-validator';

export class FindAllParticipantsQueriesDto {
  @IsOptional()
  @IsUUID()
  groupId: string;
}
