"use client";

import { getParticipantsByGroupId } from "@/lib/api/participants";
import { ParticipantListRow } from "./participant-list-row";
import { useEffect, useState } from "react";
import { Participant } from "@/types/participants";

type Props = {
  groupId: string;
  rowsWithActions?: boolean;
  handleSelectParticipant?: (participant: Participant) => void;
};

export function ParticipantList({
  groupId,
  handleSelectParticipant,
  rowsWithActions = false,
}: Props) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const data = await getParticipantsByGroupId(groupId);
      setParticipants(data);
    };

    fetchParticipants();
  }, [groupId]);

  return (
    <div className="space-y-3">
      {participants && participants.length > 0 ? (
        participants.map((participant) => (
          <ParticipantListRow
            key={participant.id}
            participant={participant}
            handleSelectParticipant={handleSelectParticipant}
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
