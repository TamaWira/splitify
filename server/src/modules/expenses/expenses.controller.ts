import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get(':id')
  findExpense(@Param('id') id: string) {
    return this.expensesService.findOneWithParticipants(id);
  }

  @Patch(':id')
  updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseWithParticipants(
      id,
      updateExpenseDto,
    );
  }
}
