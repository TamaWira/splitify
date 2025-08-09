import { AddExpenseNavbar } from "@/components/features/add-expense/add-expense-navbar";
import { ExpenseForm } from "@/components/shared/expense-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <AddExpenseNavbar />
      <ExpenseForm groupId={id} />
    </main>
  );
}
