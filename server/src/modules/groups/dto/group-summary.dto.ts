export class GroupSummaryDto {
  id: string;
  title: string;
  participantsCount: number;
  expensesCount: number;
  totalAmount: number;
  unsettledAmount: number;
  isFullySettled: boolean;
}
