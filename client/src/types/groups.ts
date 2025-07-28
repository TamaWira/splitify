export type Groups = {
  id: string;
  clientId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GroupSummary = Omit<
  Groups,
  "createdAt" | "updatedAt" | "clientId"
> & {
  totalAmount: number;
  participantCount: number;
  expenseCount: number;
  isSettled: boolean;
  unsettledAmount: number;
};
