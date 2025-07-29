import { addExpense } from "@/actions/expenses";
import { ExpenseDetailsForm } from "./expense-details-form";

type AddExpenseProps = {
  groupId: string;
};

export function AddExpenseForm({ groupId }: AddExpenseProps) {
  const formAction = addExpense.bind(null, groupId);

  return (
    <form action={formAction} className="space-y-10">
      {/* ExpenseDetailsForm */}
      <ExpenseDetailsForm />
      {/* SplitDetailsForm */}
      {/* FormActionsButtons */}
    </form>
  );
}
