import { ExpenseWithSummary } from "@/types/expenses";
import { ExpenseListRow } from "./expense-list-row";

export function ExpensesList({ expenses }: { expenses: ExpenseWithSummary[] }) {
  return (
    <div className="space-y-3">
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseListRow key={expense.id} expense={expense} />
        ))
      ) : (
        <div className="flex items-center justify-center h-30">
          <p>No expenses found.</p>
        </div>
      )}
    </div>
  );
}
