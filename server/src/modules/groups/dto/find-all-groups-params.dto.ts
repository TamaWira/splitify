import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class FindAllGroupsParamsDto {
  @IsUUID()
  clientId: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === '1')
  @IsBoolean()
  withSummary?: boolean;
}
