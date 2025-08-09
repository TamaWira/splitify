import { SplitSummary } from "@/types/groups";
import { safeFetch } from "../safeFetch";
import { ExpenseWithSummary } from "@/types/expenses";

export async function fetchSplitSummary(id: string) {
  return safeFetch<SplitSummary[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${id}/split-summary`,
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
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/expenses?withSummary=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
}
