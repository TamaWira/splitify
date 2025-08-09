import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExpenseWithSummary } from "@/types/expenses";
import Link from "next/link";
import { formatRupiah } from "../../../utils/format-to-rupiah";

type ExpenseListRowProps = {
  expense: ExpenseWithSummary;
};

export function ExpenseListRow({ expense }: ExpenseListRowProps) {
  return (
    <Card>
      <Link href={`/groups/${expense.groupId}/expenses/${expense.id}`}>
        {/* Header */}
        <div className="flex justify-between">
          <div className="space-y-1">
            <h2 className="font-semibold text-xl">{expense.title}</h2>
            <div className="bg-gray-200 px-3 py-1 rounded-full w-fit font-semibold text-light-white text-xs text-center">
              <p>{expense.category}</p>
            </div>
          </div>
          <h2 className="font-bold text-xl">
            {formatRupiah(parseFloat(expense.totalAmount))}
          </h2>
        </div>
        <Separator className="my-4" />
        {/* Footer */}
        <div className="flex justify-between items-center font-semibold text-light-white/80">
          <p>Paid by {expense.paidBy}</p>
          <p>
            {expense.participantsCount}{" "}
            {expense.participantsCount === 1 ? "person" : "people"}
          </p>
        </div>
      </Link>
    </Card>
  );
}
