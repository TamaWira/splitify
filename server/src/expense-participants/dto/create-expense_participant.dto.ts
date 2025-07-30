import { IsNumber, IsUUID } from 'class-validator';

export class CreateExpenseParticipantDto {
  @IsUUID()
  expenseId: string;

  @IsUUID()
  participantId: string;

  @IsNumber()
  share: number;
}
