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

export const addExpense = async (groupId: string, formData: FormData) => {
  try {
    const response = await fetch(`http://localhost:8000/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
        ...Object.fromEntries(formData),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
