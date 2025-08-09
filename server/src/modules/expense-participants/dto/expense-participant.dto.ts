import { ApiProperty } from '@nestjs/swagger';

export class ExpenseParticipantDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  expenseId: string;

  @ApiProperty()
  participantId: string;

  @ApiProperty()
  share: number;
}
