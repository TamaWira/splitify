import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExpenseWithSummary } from "@/types/expenses";

type ExpenseListRowProps = {
  expense: ExpenseWithSummary;
};

export function ExpenseListRow({ expense }: ExpenseListRowProps) {
  return (
    <Card>
      {/* Header */}
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="font-semibold text-xl">{expense.title}</h2>
          <div className="px-3 py-1 w-fit rounded-full bg-gray-200 text-light-white text-center text-xs font-semibold">
            <p>{expense.category}</p>
          </div>
        </div>
        <h2 className="font-bold text-xl">${expense.totalAmount}</h2>
      </div>
      <Separator className="my-4" />
      {/* Footer */}
      <div className="flex items-center justify-between text-light-white/80 font-semibold">
        <p>Paid by {expense.paidBy}</p>
        <p>
          {expense.participantsCount}{" "}
          {expense.participantsCount === 1 ? "person" : "people"}
        </p>
      </div>
    </Card>
  );
}
