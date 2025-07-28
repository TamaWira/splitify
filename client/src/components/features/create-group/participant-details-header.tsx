import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type ParticipantDetailsHeaderProps = {
  handleDeleteParticipant: (index: number) => void;
  index: number;
};

export function ParticipantDetailsHeader({
  handleDeleteParticipant,
  index,
}: ParticipantDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="font-medium">Participant {index + 1}</p>
      <Button variant="ghost" onClick={() => handleDeleteParticipant(index)}>
        <Trash2 className="text-red-500" size={16} />
      </Button>
    </div>
  );
}
