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
