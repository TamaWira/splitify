"use server";

import { ApiResponse } from "@/types/api";
import {
  CreateExpenseDto,
  Expense,
  ExpenseWithSummary,
} from "@/types/expenses";

export const fetchExpensesByGroupId = async (
  groupId: string,
): Promise<ApiResponse<Expense[]>> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/expenses?groupId=${groupId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchExpensesWithSummaryByGroupId = async (
  groupId: string,
): Promise<ExpenseWithSummary[]> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/expenses/summary?groupId=${groupId}`,
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
    const response = await fetch(`http://localhost:8000/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
