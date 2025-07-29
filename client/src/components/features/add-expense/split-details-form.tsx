import { CheckboxWithLabel } from "@/components/shared/checkbox-with-label";
import { Card } from "@/components/ui/card";

const mockParticipants = [
  { value: "bayu", label: "Bayu" },
  { value: "bernika", label: "Bernika" },
  { value: "ken", label: "Ken" },
];

export function SplitDetailsForm() {
  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h2 className="font-semibold text-xl">Split Between</h2>
          <p className="text-gray-500/80">
            Select participants to split this expense
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {mockParticipants.map((participant) => (
            <CheckboxWithLabel
              key={participant.value}
              id={participant.value}
              label={participant.label}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
