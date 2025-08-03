import { fetchGroupsExpenses } from "@/lib/api/groups";
import { ExpensesList } from "./expenses-list";
import { SectionHeader } from "./section-header";

type ExpensesSectionProps = {
  groupId: string;
};

export async function ExpensesSection({ groupId }: ExpensesSectionProps) {
  const expenses = await fetchGroupsExpenses(groupId);

  return (
    <div className="space-y-3">
      <SectionHeader
        title="Expenses"
        actionLabel="+ Add Expense"
        href={`/groups/${groupId}/add-expense`}
      />

      <ExpensesList expenses={expenses} />
    </div>
  );
}
