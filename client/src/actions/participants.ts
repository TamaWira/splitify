"use server";

export async function getParticipantsByGroupId(groupId: string) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/participants?groupId=${groupId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch participants");
  }
}
