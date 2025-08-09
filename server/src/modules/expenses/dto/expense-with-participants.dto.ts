import { ExpenseParticipantDto } from 'src/modules/expense-participants/dto/expense-participant.dto';
import { ExpenseDto } from './expense.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseWithParticipantsDto extends ExpenseDto {
  @ApiProperty({ type: () => [ExpenseParticipantDto] })
  participants: ExpenseParticipantDto[];
}
