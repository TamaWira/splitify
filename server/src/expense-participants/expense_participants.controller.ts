import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseParticipantsService } from './expense_participants.service';
import { CreateExpenseParticipantDto } from './dto/create-expense_participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense_participant.dto';

@Controller('expense-participants')
export class ExpenseParticipantsController {
  constructor(
    private readonly expenseParticipantsService: ExpenseParticipantsService,
  ) {}

  @Post()
  create(@Body() createExpenseParticipantDto: CreateExpenseParticipantDto) {
    return this.expenseParticipantsService.create(createExpenseParticipantDto);
  }

  @Get()
  findAll() {
    return this.expenseParticipantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseParticipantsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseParticipantDto: UpdateExpenseParticipantDto,
  ) {
    return this.expenseParticipantsService.update(
      id,
      updateExpenseParticipantDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseParticipantsService.remove(id);
  }
}
