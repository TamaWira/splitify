export function SplitDetailsFormHeader({
  totalChecked,
  splitAmount,
}: {
  totalChecked: number;
  splitAmount: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Split Between</h2>
      <p className="text-gray-500/80">
        {totalChecked
          ? `$${splitAmount.toFixed(2)} per person`
          : "Select participants to split this expense"}
      </p>
    </div>
  );
}
