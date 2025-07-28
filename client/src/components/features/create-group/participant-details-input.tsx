type ParticipantDetailsInputProps = {
  name: string;
  value: string;
  placeholder: string;
  isRequired?: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ParticipantDetailsInput({
  name,
  value,
  placeholder,
  isRequired,
  handleOnChange,
}: ParticipantDetailsInputProps) {
  return (
    <input
      required={isRequired}
      type="text"
      name={name}
      className="w-full px-4 py-2 text-sm text-gray-500 font-semibold rounded-full border border-gray-500/10 bg-[#FAFAFA]"
      value={value}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
}
