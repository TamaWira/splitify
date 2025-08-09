import { Participant } from "@/types/participants";
import { safeFetch } from "../safeFetch";

export async function getParticipantsByGroupId(
  groupId: string
): Promise<Participant[]> {
  return safeFetch<Participant[]>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/participants`
  );
}
