export type Expense = {
  id: string;
  groupId: string;
  paidBy: string;
  title: string;
  amount: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateExpenseDto = {
  groupId: string;
  title: string;
  amount: number;
  category: string;
  paidBy: string;
  participants: string[];
  share: number;
  isSettled: boolean;
};

export type ExpenseWithSummary = {
  id: string;
  title: string;
  totalAmount: string;
  category: string;
  paidBy: string;
  participantsCount: number;
};
