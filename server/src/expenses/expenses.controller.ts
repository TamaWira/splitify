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

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(
    @Query('groupId') groupId: string,
    @Query('paidBy') paidBy: string,
    @Query('category') category: string,
    @Query('isSettled') isSettled: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const filter: FilterExpenseDto = {
      groupId,
      paidBy,
      category,
      isSettled,
      page,
      limit,
    };

    return this.expensesService.findAll(filter);
  }

  @Get('/summary')
  async findByGroupIdWithSummaries(@Query('groupId') groupId: string) {
    return await this.expensesService.findByGroupIdWithSummaries(groupId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeParticipants') includeParticipants?: string,
  ) {
    const includeParticipantsBool = includeParticipants === 'true';
    return this.expensesService.findOne(id, {
      includeParticipants: includeParticipantsBool,
    });
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
