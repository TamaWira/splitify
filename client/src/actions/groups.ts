"use server";

import { GroupSummary } from "@/types/groups";
import { getSplitifyClientId } from "@/utils/get-splitify-client-id";
import { redirect } from "next/navigation";

export const fetchGroupSummaries = async (
  clientId: string,
): Promise<GroupSummary[]> => {
  const response = await fetch(`http://localhost:8000/api/groups/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${clientId}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const addGroup = async (formData: FormData) => {
  "use server";

  let groupId;
  const clientId = await getSplitifyClientId();

  const groupTitle = formData.get("group-title") as string;
  const names = formData.getAll("participant-name") as string[];
  const emails = formData.getAll("participant-email") as string[];

  const participants = names.map((name, i) => ({
    name,
    ...(emails[i] && { email: emails[i] }),
  }));

  const payload = {
    group: {
      clientId,
      title: groupTitle,
    },
    participants,
  };

  try {
    const response = await fetch(
      "http://localhost:8000/api/groups/with-participants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    groupId = data.id;

    // Move redirect outside the try-catch block
  } catch (error) {
    console.error("Failed to create group:", error);
    return; // Early return on error
  }

  // Redirect happens here, outside of try-catch
  redirect(`/groups/${groupId}`);
};
