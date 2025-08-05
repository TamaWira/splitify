import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Participant } from "@/types/participants";
import { SquarePen, Trash2 } from "lucide-react";

type Props = {
  participant: Participant;
  withActions?: boolean;
  handleSelectParticipant?: (participant: Participant) => void;
};

export function ParticipantListRow({
  participant,
  handleSelectParticipant,
  withActions = false,
}: Props) {
  const avatar = participant.name[0].toUpperCase();

  return (
    <Card>
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-hue-green rounded-full w-8 h-8 font-semibold text-md text-primary-green">
            {avatar}
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-lg">{participant.name}</p>
            {participant.email && (
              <p className="font-medium text-gray-500 text-xs">
                {participant.email}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {withActions && handleSelectParticipant && (
            <>
              <Button
                variant="ghost"
                className="m-0 p-0"
                onClick={() => handleSelectParticipant(participant)}
              >
                <SquarePen size={20} className="text-gray-500" />
              </Button>

              <Button variant="ghost" className="m-0 p-0">
                <Trash2 size={20} className="text-red-400" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
