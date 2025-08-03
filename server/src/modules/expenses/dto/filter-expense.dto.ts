// dto/filter-expense.dto.ts
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class FilterExpenseDto {
  @IsOptional()
  @IsUUID()
  groupId?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === '1')
  @IsBoolean()
  withSummary?: boolean;
}
