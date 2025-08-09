import { cookies } from "next/headers";

export async function getSplitifyClientId() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get("splitify_client_id")?.value.split(" ")[1];

  return clientId;
}
