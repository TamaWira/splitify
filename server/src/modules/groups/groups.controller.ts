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

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly participantsService: ParticipantsService,
    private readonly expensesService: ExpensesService,
    private readonly expenseParticipantsService: ExpenseParticipantsService,
  ) {}

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

  @Get(':id/participants')
  findAllParticipants(@Param('id') id: string) {
    return this.participantsService.findAll({ groupId: id });
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
