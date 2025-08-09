import { ExpenseParticipant } from "./expense-participants";

export type Expense = {
  id: string;
  groupId: string;
  paidBy: string;
  title: string;
  amount: number;
  category: string;
  isSettled: boolean;
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
  isSettled: boolean;
};

export type ExpenseWithSummary = {
  id: string;
  groupId: string;
  title: string;
  totalAmount: string;
  category: string;
  paidBy: string;
  participantsCount: number;
};

export type ExpenseWithParticipants = Expense & {
  participants: ExpenseParticipant[];
};
