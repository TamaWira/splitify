import { AddExpenseForm } from "@/components/features/add-expense/add-expense-form";
import { AddExpenseNavbar } from "@/components/features/add-expense/add-expense-navbar";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <main className="px-5 pb-10 pt-[80px] space-y-8 min-h-screen">
      <AddExpenseNavbar />
      <AddExpenseForm groupId={id} />
    </main>
  );
}
