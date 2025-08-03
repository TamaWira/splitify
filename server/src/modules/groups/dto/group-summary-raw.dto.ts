export class GroupSummaryRaw {
  id: string;
  title: string;
  participantsCount: string; // comes as string from raw query
  expensesCount: string;
  totalAmount: string;
  unsettledAmount: string;
  isFullySettled: boolean | string; // PostgreSQL may return it as string 'true'
}
