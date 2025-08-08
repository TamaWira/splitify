import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  /**
   * Create individual expense
   * @param createExpenseDto - create expense body request
   * @returns
   */
  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  /**
   * Get list of expenses by group id and filters
   * @param filter
   * @returns
   */
  @Get()
  findAll(@Query() filter: FilterExpenseDto) {
    return this.expensesService.findAll(filter);
  }
}
