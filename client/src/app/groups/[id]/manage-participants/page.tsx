import { ParticipantList } from "@/components/features/group-detail/participant-list";
import { ManageParticipantsHeader } from "@/components/features/manage-participants/manage-participants-header";
import { ManageParticipantsNavbar } from "@/components/features/manage-participants/manage-participants-navbar";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = await params;

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <ManageParticipantsNavbar />
      <ManageParticipantsHeader groupId={groupId} />
      <ParticipantList groupId={groupId} rowsWithActions />
    </main>
  );
}
