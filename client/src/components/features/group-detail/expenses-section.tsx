import { fetchExpensesByGroupId } from "@/actions/expenses";
import { SectionHeader } from "./section-header";
import { ExpensesList } from "./expenses-list";

type ExpensesSectionProps = {
  groupId: string;
};

export async function ExpensesSection({ groupId }: ExpensesSectionProps) {
  const expenses = await fetchExpensesByGroupId(groupId);

  return (
    <div>
      <SectionHeader
        title="Expenses"
        actionLabel="+ Add Expense"
        href={`/groups/${groupId}/add-expense`}
      />

      <ExpensesList expenses={expenses} />
    </div>
  );
}
