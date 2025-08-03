import { getExpenseById } from "@/actions/expenses";
import { ExpenseNavbar } from "@/components/features/expense/expense-navbar";

export default async function ExpensePage({
  params,
}: {
  params: { expenseId: string };
}) {
  const { expenseId } = await params;
  const expense = await getExpenseById(expenseId);

  return (
    <main className="px-5 pb-10 pt-[80px] space-y-8 min-h-screen">
      <ExpenseNavbar title={expense.title} />
    </main>
  );
}
