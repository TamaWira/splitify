import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function ExpenseFulfillmentSwitch() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Label htmlFor="is-settled">Fulfilled?</Label>
        <Switch
          id="is-settled"
          name="is-settled"
          defaultChecked={false}
          className="data-[state=checked]:bg-primary-green"
        />
      </div>
    </Card>
  );
}
