import { InputWithLabel } from "@/components/shared/input-with-label";
import { SelectWithLabel } from "@/components/shared/select-with-label";
import { Card } from "@/components/ui/card";
import { Expense } from "@/types/expenses";

const mockCategories = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "other", label: "Other" },
];

type ExpenseDetailsFormProps = {
  expense?: Expense;
  participantOptions: { value: string; label: string }[];
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ExpenseDetailsForm({
  expense,
  participantOptions,
  handleAmountChange,
}: ExpenseDetailsFormProps) {
  return (
    <Card>
      <div className="space-y-5">
        <h2 className="font-semibold text-xl">Expense Details</h2>
        <InputWithLabel
          required
          label="Expense Title"
          placeholder="e.g., Dinner at restaurant"
          defaultValue={expense ? expense.title : ""}
          type="text"
          name="title"
        />
        <InputWithLabel
          required
          label="Amount"
          placeholder="0.00"
          type="number"
          name="amount"
          defaultValue={expense ? expense.amount.toString() : 0}
          onChange={handleAmountChange}
        />
        <SelectWithLabel
          required
          label="Category"
          placeholder="Select category"
          name="category"
          defaultValue={expense ? expense.category : ""}
          options={mockCategories}
        />
        <SelectWithLabel
          required
          label="Paid By"
          placeholder="Who paid?"
          name="paid-by"
          defaultValue={expense ? expense.paidBy : ""}
          options={participantOptions}
        />
      </div>
    </Card>
  );
}
