"use server";

import { ApiResponse } from "@/types/api";
import {
  CreateExpenseDto,
  Expense,
  ExpenseWithParticipants,
  ExpenseWithSummary,
} from "@/types/expenses";

export const fetchExpensesByGroupId = async (
  groupId: string
): Promise<ApiResponse<Expense[]>> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/expenses?groupId=${groupId}`
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/expenses`
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
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/expenses`,
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

export const editExpense = async (id: string, payload: CreateExpenseDto) => {
  console.log("Edit Expense");

  try {
    const { ...rest } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/expenses/${id}`,
      {
        method: "PATCH",
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

export const getExpenseById = async (
  id: string
): Promise<ExpenseWithParticipants> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/expenses/${id}`
    );
    const data =
      (await response.json()) as ApiResponse<ExpenseWithParticipants>;

    return data.data as ExpenseWithParticipants;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
