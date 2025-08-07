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
import { ParticipantsService } from '../participants/participants.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { FindAllGroupsParamsDto } from './dto/find-all-groups-params.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { ExpenseParticipantsService } from '../expense-participants/expense-participants.service';
import { ExpensesService } from '../expenses/expenses.service';
import { CreateExpenseDto } from '../expenses/dto/create-expense.dto';
import { UpdateParticipantDto } from '../participants/dto/update-participant.dto';
import { CreateParticipantDto } from '../participants/dto/create-participant.dto';
import { UpdateExpenseDto } from '../expenses/dto/update-expense.dto';

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

  @Get(':groupId/expenses/:expenseId')
  findExpense(@Param('expenseId') expenseId: string) {
    return this.expensesService.findOneWithParticipants(expenseId);
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

  @Patch(':groupId/expenses/:expenseId')
  updateExpense(
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.updateExpenseWithParticipants(
      expenseId,
      updateExpenseDto,
    );
  }

  // ==================================
  // ========== Participants ==========
  // ==================================

  @Get(':id/participants')
  findAllParticipants(@Param('id') id: string) {
    return this.participantsService.findAll({ groupId: id });
  }

  @Post(':groupId/participants')
  createParticipant(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Patch(':groupId/participants/:participantId')
  updateParticipant(
    @Param('participantId') participantId: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(participantId, updateParticipantDto);
  }

  @Delete(':groupId/participants/:participantId')
  deleteParticipant(@Param('participantId') participantId: string) {
    return this.participantsService.remove(participantId);
  }

  @Get(':id/summary-text')
  async getTextSummary(@Param('id') id: string) {
    return this.groupsService.generateSplitTextSummary(id);
  }

  // ========================================
  // ========================================
  // ========================================

  // ===== Participants =====

  // @Post(':id/participants')
  // createParticipant(
  //   @Param('id') id: string,
  //   @Body() createParticipantDto: CreateParticipantInGroupDto,
  // ) {
  //   const payload = {
  //     groupId: id,
  //     ...createParticipantDto,
  //   };
  //   return this.participantsService.create(payload);
  // }

  // @Post('/with-participants')
  // async createGroupWithParticipants(
  //   @Body() createGroupWithParticipantsDto: CreateGroupWithParticipantsDto,
  // ) {
  //   const groupDto = createGroupWithParticipantsDto.group;
  //   const participantsDto = createGroupWithParticipantsDto.participants;
  //   return await this.groupsService.createGroupWithParticipants(
  //     groupDto,
  //     participantsDto,
  //   );
  // }

  // @Get()
  // findAll() {
  //   return this.groupsService.findAll();
  // }

  // @UseGuards(AuthGuard)
  // @Get('/summary')
  // async findAllWithSummary(@Req() req: RequestWithUser) {
  //   return await this.groupsService.findAllWithSummary(req.user.clientId);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.groupsService.findOne(id);
  // }

  // @Get(':id/summary')
  // async findOneWithSummary(@Param('id') id: string) {
  //   return await this.groupsService.findOneWithSummary(id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
