import { addGroup } from "@/actions/groups";
import { CreateGroupNavbar } from "@/components/features/create-group/create-group-navbar";
import { GroupDetailsForm } from "@/components/features/create-group/group-details-form";
import { ParticipantsDetailsForm } from "@/components/features/create-group/participants-details-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="px-5 pb-10 pt-[80px] space-y-10 min-h-screen">
      <CreateGroupNavbar />

      <form className="space-y-10" action={addGroup}>
        <GroupDetailsForm />
        <ParticipantsDetailsForm />

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit">Create Group</Button>
        </div>
      </form>
    </main>
  );
}
