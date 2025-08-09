"use server";

import { safeFetch } from "@/lib/safeFetch";
import { ApiResponse } from "@/types/api";
import { GroupSummary } from "@/types/groups";
import { getSplitifyClientId } from "@/utils/get-splitify-client-id";
import { redirect } from "next/navigation";

export const fetchGroupById = async (id: string): Promise<GroupSummary> => {
  const clientId = await getSplitifyClientId();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientId}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const fetchGroupByIdWithSummary = async (
  id: string
): Promise<GroupSummary> => {
  const clientId = await getSplitifyClientId();

  return safeFetch<GroupSummary>(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${id}?withSummary=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientId}`,
      },
      cache: "no-store",
    }
  );

  // const response = await fetch(
  //   `http://localhost:8000/api/groups/${id}/summary`,
  // {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${clientId}`,
  //   },
  //   cache: "no-store",
  // }
  // );

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  // return await response.json();
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
    clientId,
    title: groupTitle,
    participants,
  };

  console.log(payload);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    groupId = data.id;

    // Move redirect outside the try-catch block
  } catch (error) {
    console.error("Failed to create group:", error);
    return; // Early return on error
  }

  // Redirect happens here, outside of try-catch
  redirect(`/groups/${groupId}`);
};
