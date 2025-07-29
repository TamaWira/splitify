import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxWithLabelProps = {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: ((checked: CheckedState) => void) | undefined;
};

export function CheckboxWithLabel({
  id,
  label,
  checked,
  onChange,
}: CheckboxWithLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={id}
        name="participants"
        value={id}
        className="data-[state=checked]:bg-primary-green data-[state=checked]:border-primary-green"
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor={id} className="text-gray-600 font-semibold">
        {label}
      </Label>
    </div>
  );
}
