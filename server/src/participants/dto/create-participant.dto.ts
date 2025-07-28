import { Optional } from '@nestjs/common';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateParticipantDto {
  @IsUUID()
  groupId: string;

  @IsString()
  name: string;

  @Optional()
  @IsEmail()
  email: string;
}
