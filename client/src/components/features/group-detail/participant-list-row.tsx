import { Card } from "@/components/ui/card";
import { Participant } from "@/types/participants";

type Props = {
  participant: Participant;
};

export function ParticipantListRow({ participant }: Props) {
  const avatar = participant.name[0].toUpperCase();

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center bg-hue-green rounded-full w-10 h-10 font-semibold text-primary-green text-lg">
          {avatar}
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-xl">{participant.name}</p>
          {participant.email && (
            <p className="font-medium text-gray-500">{participant.email}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
