import { addExpense } from "@/actions/expenses";
import { AddExpenseFormActionButtonsClientWrapper } from "./add-expense-form-action-buttons-client-wrapper";
import { ExpenseDetailsForm } from "./expense-details-form";
import { SplitDetailsForm } from "./split-details-form";

type AddExpenseProps = {
  groupId: string;
};

export function AddExpenseForm({ groupId }: AddExpenseProps) {
  const formAction = addExpense.bind(null, groupId);

  return (
    <form action={formAction} className="space-y-10">
      <ExpenseDetailsForm />
      <SplitDetailsForm />
      <AddExpenseFormActionButtonsClientWrapper />
    </form>
  );
}
