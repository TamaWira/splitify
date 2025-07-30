import { ExpenseDto } from './expense-basic.dto';

export class ExpenseWithParticipantsDto extends ExpenseDto {
  participants: {
    id: string;
    name: string;
    share: number;
  }[];
}
