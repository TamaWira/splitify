"use server";

import { revalidatePath } from "next/cache";

export const addParticipant = async (formData: FormData) => {
  const groupId = formData.get("group-id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const payload = {
    groupId,
    name,
    email,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/participants`,
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

    revalidatePath(`/groups/${groupId}/manage-participants`);
  } catch (error) {
    console.error("Failed to create group:", error);
    return;
  }
};

export const editParticipant = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const groupId = formData.get("group-id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const payload = {
    groupId,
    name,
    email,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/participants/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidatePath(`/groups/${groupId}/manage-participants`);
  } catch (error) {
    console.error("Failed to create group:", error);
    return;
  }
};

export const deleteParticipant = async (id: string, groupId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/participants/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidatePath(`/groups/${groupId}/manage-participants`);
  } catch (error) {
    console.error("Failed to create group:", error);
    return;
  }
};
