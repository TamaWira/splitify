import { getParticipantsByGroupId } from "@/lib/api/participants";
import { ParticipantListRow } from "./participant-list-row";

type Props = {
  groupId: string;
  rowsWithActions?: boolean;
};

export async function ParticipantList({
  groupId,
  rowsWithActions = false,
}: Props) {
  const participants = await getParticipantsByGroupId(groupId);

  return (
    <div className="space-y-3">
      {participants && participants.length > 0 ? (
        participants.map((participant) => (
          <ParticipantListRow
            key={participant.id}
            participant={participant}
            withActions={rowsWithActions}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-30">
          <p>No participants found.</p>
        </div>
      )}
    </div>
  );
}
