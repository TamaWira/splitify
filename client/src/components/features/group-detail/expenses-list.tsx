import { Expense } from "@/types/expenses";

export function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <div>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => <div key={expense.id}>{expense.title}</div>)
      ) : (
        <div className="flex items-center justify-center h-30">
          <p>No expenses found.</p>
        </div>
      )}
    </div>
  );
}
