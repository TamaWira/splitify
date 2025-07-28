import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateGroupWithParticipantsDto } from './dto/create-group-with-participants.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post('/with-participants')
  async createGroupWithParticipants(
    @Body() createGroupWithParticipantsDto: CreateGroupWithParticipantsDto,
  ) {
    const groupDto = createGroupWithParticipantsDto.group;
    const participantsDto = createGroupWithParticipantsDto.participants;
    return await this.groupsService.createGroupWithParticipants(
      groupDto,
      participantsDto,
    );
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/summary')
  async findAllWithSummary(@Req() req) {
    return await this.groupsService.findAllWithSummary(req.user.clientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
