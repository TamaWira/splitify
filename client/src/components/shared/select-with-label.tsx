import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectWithLabelProps = {
  required?: boolean;
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
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <Select name={name} required={required}>
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
