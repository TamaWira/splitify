import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/common/auth/auth.guard';
import { ExpenseParticipantsService } from '../expense-participants/expense-participants.service';
import { CreateExpenseDto } from '../expenses/dto/create-expense.dto';
import { ExpensesService } from '../expenses/expenses.service';
import { CreateParticipantDto } from '../participants/dto/create-participant.dto';
import { ParticipantsService } from '../participants/participants.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { FindAllGroupsParamsDto } from './dto/find-all-groups-params.dto';
import { GroupSummaryDto } from './dto/group-summary.dto';
import { GroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { SplitSummaryDto } from '../expense-participants/dto/split-summary.dto';

type RequestWithUser = Request & {
  user: {
    clientId: string;
  };
};

@ApiExtraModels(GroupDto, GroupSummaryDto)
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get List of Groups based on Client ID' })
  @ApiQuery({
    name: 'withSummary',
    required: false,
    description: 'If true, returns summary view instead of the basic group',
    schema: { type: 'boolean' },
  })
  @ApiOkResponse({
    description: 'Basic group OR summary group, depending on query',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(GroupDto) },
        { $ref: getSchemaPath(GroupSummaryDto) },
      ],
      // Optional: help Swagger UI choose by a field
      discriminator: {
        propertyName: 'kind',
        mapping: {
          basic: getSchemaPath(GroupDto),
          summary: getSchemaPath(GroupSummaryDto),
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Client Id not found',
  })
  findAll(
    @Query() query: FindAllGroupsParamsDto,
    @Req() req: RequestWithUser,
  ): Promise<(GroupDto | GroupSummaryDto)[]> {
    const { clientId } = req.user;
    console.log(req.user);
    console.log(clientId);
    return this.groupsService.findAll(clientId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group by id with summary' })
  @ApiOkResponse({
    description:
      'Group summary with amount, expense count, and participants count',
    type: GroupSummaryDto,
  })
  @ApiNotFoundResponse({
    description: 'Group not found',
  })
  findOne(@Param('id') id: string): Promise<GroupSummaryDto> {
    return this.groupsService.findOne(id);
  }

  @Get(':id/split-summary')
  @ApiOperation({ summary: "Get a group's split summary" })
  @ApiOkResponse({
    description: 'Split summary per participants in the group',
    type: SplitSummaryDto,
  })
  @ApiNotFoundResponse({
    description: 'Group not found',
  })
  getSplitSummary(@Param('id') id: string): Promise<SplitSummaryDto[]> {
    return this.expenseParticipantsService.getSplitSummary(id);
  }

  @Get(':id/summary-text')
  @ApiOperation({ summary: 'Get shareable split summary (text)' })
  @ApiOkResponse({
    description: 'String containing the summary of the split',
    example: `
      Split Summary

      💸 Split Summary for "Weekend Trip"

      Total Expenses: Rp50.000
      Participants: Bernika, Bayu

      Bernika = Rp20.050
      • Mie Gacoan (level 1) Rp10.000
      • Es Teh Rp50
      • Ujang Kedu Rp10.000

      Bayu = Rp20.050
      • Mie Gacoan (level 1) Rp10.000
      • Es Teh Rp50
      • Ujang Kedu Rp10.000

      💳 Who Paid the Bill
      - Bayu
      - Bernika

      Who Owes Whom
      - Bernika owes Bayu Rp15.000

      == Report generated with Splitify
      == https://yoursplitapp.com
    `,
  })
  async getTextSummary(@Param('id') id: string): Promise<string> {
    return this.groupsService.generateSplitTextSummary(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiOkResponse({
    description: 'Basic group',
    type: GroupDto,
  })
  create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.create(createGroupDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a group by id' })
  @ApiCreatedResponse({
    description: 'Updated group',
    type: GroupDto,
  })
  @ApiNotFoundResponse({
    description: 'Group not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDto> {
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
