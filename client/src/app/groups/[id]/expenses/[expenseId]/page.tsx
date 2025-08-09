import { getExpenseById } from "@/actions/expenses";
import { ExpenseNavbar } from "@/components/features/expense/expense-navbar";
import { ExpenseForm } from "@/components/shared/expense-form";

export default async function ExpensePage({
  params,
}: {
  params: { id: string; expenseId: string };
}) {
  const { expenseId, id: groupId } = await params;
  const expense = await getExpenseById(expenseId);

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <ExpenseNavbar title={expense.title} />
      <ExpenseForm groupId={groupId} expense={expense} />
    </main>
  );
}
