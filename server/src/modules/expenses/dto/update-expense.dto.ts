import { PartialType } from '@nestjs/mapped-types';
import { Expense } from '../entities/expense.entity';

export class UpdateExpenseDto extends PartialType(Expense) {}
