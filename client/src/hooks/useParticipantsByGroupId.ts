import { getParticipantsByGroupId } from "@/actions/participants";
import { Participant } from "@/types/participants";
import { useEffect, useState } from "react";

export const useParticipantsByGroupId = (groupId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const participantOptions = participants.map((participant) => ({
    label: participant.name,
    value: participant.id,
  }));

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setIsLoading(true);
        const data = await getParticipantsByGroupId(groupId);
        setParticipants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, [groupId]);

  return {
    participants,
    participantOptions,
    isFetchingParticipants: isLoading,
  };
};
