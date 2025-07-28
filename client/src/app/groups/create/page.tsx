import { CreateGroupNavbar } from "@/components/features/create-group/create-group-navbar";
import { GroupDetailsForm } from "@/components/features/create-group/group-details-form";
import { ParticipantsDetailsForm } from "@/components/features/create-group/participants-details-form";
import { Button } from "@/components/ui/button";
import { getSplitifyClientId } from "@/utils/get-splitify-client-id";
import { redirect } from "next/navigation";

export default function Page() {
  const formAction = async (formData: FormData) => {
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

  return (
    <main className="px-5 pb-10 pt-[80px] space-y-10 min-h-screen">
      <CreateGroupNavbar />

      <form className="space-y-10" action={formAction}>
        <GroupDetailsForm />
        <ParticipantsDetailsForm />

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-full">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-green text-white rounded-full"
          >
            Create Group
          </Button>
        </div>
      </form>
    </main>
  );
}
