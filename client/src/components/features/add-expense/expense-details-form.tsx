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

type ExpenseDetailsFormProps = {
  participantOptions: { value: string; label: string }[];
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ExpenseDetailsForm({
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
          type="text"
          name="title"
        />
        <InputWithLabel
          required
          label="Amount"
          placeholder="0.00"
          type="number"
          name="amount"
          onChange={handleAmountChange}
        />
        <SelectWithLabel
          required
          label="Category"
          placeholder="Select category"
          name="category"
          options={mockCategories}
        />
        <SelectWithLabel
          required
          label="Paid By"
          placeholder="Who paid?"
          name="paid-by"
          options={participantOptions}
        />
      </div>
    </Card>
  );
}
