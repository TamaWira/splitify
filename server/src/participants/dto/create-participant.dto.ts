import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateParticipantDto {
  @IsUUID()
  groupId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
