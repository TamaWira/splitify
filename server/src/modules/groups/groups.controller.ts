import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpenseParticipantsService } from '../expense-participants/expense-participants.service';
import { CreateExpenseDto } from '../expenses/dto/create-expense.dto';
import { ExpensesService } from '../expenses/expenses.service';
import { CreateParticipantDto } from '../participants/dto/create-participant.dto';
import { ParticipantsService } from '../participants/participants.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { FindAllGroupsParamsDto } from './dto/find-all-groups-params.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly participantsService: ParticipantsService,
    private readonly expensesService: ExpensesService,
    private readonly expenseParticipantsService: ExpenseParticipantsService,
  ) {}

  // ============================
  // ========== Groups ==========
  // ============================

  @Get()
  findAll(@Query() query: FindAllGroupsParamsDto) {
    return this.groupsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/split-summary')
  getSplitSummary(@Param('id') id: string) {
    return this.expenseParticipantsService.getSplitSummary(id);
  }

  @Get(':id/summary-text')
  async getTextSummary(@Param('id') id: string) {
    return this.groupsService.generateSplitTextSummary(id);
  }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  // =============================
  // ========== Expense ==========
  // =============================

  @Get(':id/expenses')
  findAllExpenses(@Param('id') id: string) {
    return this.expensesService.findAll({ groupId: id });
  }

  @Post(':id/expenses')
  createExpense(
    @Param('id') id: string,
    @Body() createExpenseDto: Omit<CreateExpenseDto, 'groupId'>,
  ) {
    const payload = {
      ...createExpenseDto,
      groupId: id,
    };

    return this.expensesService.create(payload);
  }

  // ==================================
  // ========== Participants ==========
  // ==================================

  @Get(':id/participants')
  findAllParticipants(@Param('id') id: string) {
    return this.participantsService.findAll({ groupId: id });
  }

  @Post(':id/participants')
  createParticipant(
    @Param('id') id: string,
    @Body() createParticipantDto: Omit<CreateParticipantDto, 'groupId'>,
  ) {
    const payload: CreateParticipantDto = {
      ...createParticipantDto,
      groupId: id,
    };
    return this.participantsService.create(payload);
  }

  // -- Use later
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.groupsService.remove(id);
  // }
}
