import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxWithLabelProps = {
  id: string;
  label: string;
};

export function CheckboxWithLabel({ id, label }: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={id} />
      <Label htmlFor={id} className="text-gray-600 font-semibold">
        {label}
      </Label>
    </div>
  );
}
