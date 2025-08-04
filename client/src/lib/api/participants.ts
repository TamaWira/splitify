import { Participant } from "@/types/participants";
import { safeFetch } from "../safeFetch";

export async function getParticipantsByGroupId(
  groupId: string
): Promise<Participant[]> {
  return safeFetch<Participant[]>(
    `http://localhost:8000/api/groups/${groupId}/participants`
  );
}
