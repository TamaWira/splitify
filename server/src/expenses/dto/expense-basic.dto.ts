export class ExpenseDto {
  id: string;
  title: string;
  amount: number;
  category: string;
  isSettled: boolean;
  groupId: string;
  paidBy: string;
  createdAt: Date;
}
