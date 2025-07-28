export class GroupSummaryDto {
  id: string;
  title: string;
  participantCount: number;
  expenseCount: number;
  amount: number;
  unsettledAmount: number;
  isSettled: boolean;
}
