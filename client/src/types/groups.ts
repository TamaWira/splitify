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
  participantsCount: number;
  expensesCount: number;
  isFullySettled: boolean;
  unsettledAmount: number;
};

export type SplitSummary = {
  participantId: string;
  participantName: string;
  category: "owes" | "gets";
  amount: number;
};
