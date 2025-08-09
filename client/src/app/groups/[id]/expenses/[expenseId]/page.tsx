import { getExpenseById } from "@/actions/expenses";
import { AddExpenseForm } from "@/components/features/add-expense/add-expense-form";
import { ExpenseNavbar } from "@/components/features/expense/expense-navbar";

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
      <AddExpenseForm groupId={groupId} expense={expense} />
    </main>
  );
}
