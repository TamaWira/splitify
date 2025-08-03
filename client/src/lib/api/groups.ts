import { SplitSummary } from "@/types/groups";
import { safeFetch } from "../safeFetch";
import { ExpenseWithSummary } from "@/types/expenses";

export async function fetchSplitSummary(id: string) {
  return safeFetch<SplitSummary[]>(
    `http://localhost:8000/api/groups/${id}/split-summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
}

export async function fetchGroupsExpenses(groupId: string) {
  return safeFetch<ExpenseWithSummary[]>(
    `http://localhost:8000/api/groups/${groupId}/expenses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
}
