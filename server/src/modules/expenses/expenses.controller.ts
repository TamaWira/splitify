import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { FilterFindOneExpenseDto } from './dto/filter-find-one-expense.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string, @Query() filter: FilterFindOneExpenseDto) {
    return this.expensesService.findOne(id, filter);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
