import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  groupId: string;

  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsString()
  paidBy: string;

  @IsArray()
  @IsString({ each: true })
  participants: string[];

  @IsBoolean()
  isSettled: boolean;
}
