"use server";

import { ApiResponse } from "@/types/api";
import {
  CreateExpenseDto,
  Expense,
  ExpenseWithSummary,
} from "@/types/expenses";

export const fetchExpensesByGroupId = async (
  groupId: string
): Promise<ApiResponse<Expense[]>> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/expenses?groupId=${groupId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchExpensesWithSummaryByGroupId = async (
  groupId: string
): Promise<ExpenseWithSummary[]> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/groups/${groupId}/expenses`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addExpense = async (payload: CreateExpenseDto) => {
  try {
    const { groupId, ...rest } = payload;
    const response = await fetch(
      `http://localhost:8000/api/groups/${groupId}/expenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getExpenseById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/expenses/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
