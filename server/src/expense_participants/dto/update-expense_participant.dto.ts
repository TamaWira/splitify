import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseParticipantDto } from './create-expense_participant.dto';

export class UpdateExpenseParticipantDto extends PartialType(CreateExpenseParticipantDto) {}
