"use server";

import { Expense } from "@/types/expenses";

export const fetchExpensesByGroupId = async (
  groupId: string,
): Promise<Expense[]> => {
  const response = await fetch(
    `http://localhost:8000/api/expenses?groupId=${groupId}`,
  );
  const data = await response.json();
  return data;
};
