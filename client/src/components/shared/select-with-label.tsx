import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectWithLabelProps = {
  required?: boolean;
  defaultValue?: string;
  label: string;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
};

export function SelectWithLabel({
  required,
  label,
  name,
  placeholder,
  options,
  defaultValue,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-700 text-sm" htmlFor={name}>
        {label}
      </label>
      <Select defaultValue={defaultValue} name={name} required={required}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
