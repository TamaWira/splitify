import { ExpenseWithParticipants } from "@/types/expenses";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type Props = {
  expense?: ExpenseWithParticipants;
};

export function ExpenseFulfillmentSwitch({ expense }: Props) {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <Label htmlFor="is-settled">Fulfilled?</Label>
        <Switch
          id="is-settled"
          name="is-settled"
          defaultChecked={expense ? expense.isSettled : false}
          className="data-[state=checked]:bg-primary-green"
        />
      </div>
    </Card>
  );
}
