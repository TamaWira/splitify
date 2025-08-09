import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseWithParticipantsDto } from './dto/expense-with-participants.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by id with its participants' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Expense successfully fetched',
    type: ExpenseWithParticipantsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Expense not found',
  })
  findExpense(@Param('id') id: string): Promise<ExpenseWithParticipantsDto> {
    return this.expensesService.findOneWithParticipants(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by id with its participants' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Expense successfully updated',
    type: ExpenseWithParticipantsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Expense not found',
  })
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseWithParticipantsDto> {
    return this.expensesService.updateExpenseWithParticipants(
      id,
      updateExpenseDto,
    );
  }
}
