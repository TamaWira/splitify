// dto/filter-expense.dto.ts
import {
  IsOptional,
  IsUUID,
  IsString,
  IsBooleanString,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterExpenseDto {
  @IsOptional()
  @IsUUID()
  groupId?: string;

  @IsOptional()
  @IsUUID()
  paidBy?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBooleanString()
  isSettled?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
