import { Input } from "../ui/input";

export type InputWithLabelProps = {
  required?: boolean;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputWithLabel({
  required,
  type,
  label,
  name,
  placeholder,
  value,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <Input
        required={required}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
