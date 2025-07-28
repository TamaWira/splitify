import { IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @IsUUID()
  clientId: string;

  @IsString()
  title: string;
}
