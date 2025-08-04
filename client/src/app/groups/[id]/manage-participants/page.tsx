import { ManageParticipantsNavbar } from "@/components/features/manage-participants/manage-participants-navbar";
import { ManageParticipantsHeader } from "./manage-participants-header";
import { ParticipantList } from "@/components/features/group-detail/participant-list";

export default async function Page({ params }: { params: { id: string } }) {
  const { id: groupId } = await params;

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <ManageParticipantsNavbar />
      <ManageParticipantsHeader />
      <ParticipantList groupId={groupId} rowsWithActions />
    </main>
  );
}
