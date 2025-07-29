import { InputWithLabel } from "@/components/shared/input-with-label";
import { SelectWithLabel } from "@/components/shared/select-with-label";
import { Card } from "@/components/ui/card";

const mockCategories = [
  { value: "food", label: "Food" },
  { value: "transportation", label: "Transportation" },
  { value: "entertainment", label: "Entertainment" },
  { value: "shopping", label: "Shopping" },
  { value: "other", label: "Other" },
];

const mockParticipants = [
  { value: "bayu", label: "Bayu" },
  { value: "bernika", label: "Bernika" },
  { value: "ken", label: "Ken" },
];

export function ExpenseDetailsForm() {
  return (
    <Card>
      <div className="space-y-5">
        <h2 className="font-semibold text-xl">Expense Details</h2>
        <InputWithLabel
          label="Expense Title"
          placeholder="e.g., Dinner at restaurant"
          type="text"
          name="title"
        />
        <InputWithLabel
          label="Amount"
          placeholder="0.00"
          type="number"
          name="amount"
        />
        <SelectWithLabel
          label="Category"
          placeholder="Select category"
          name="category"
          options={mockCategories}
        />
        <SelectWithLabel
          label="Paid By"
          placeholder="Who paid?"
          name="paidBy"
          options={mockParticipants}
        />
      </div>
    </Card>
  );
}
