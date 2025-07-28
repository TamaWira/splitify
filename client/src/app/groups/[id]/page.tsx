import { fetchGroupByIdWithSummary } from "@/actions/groups";
import { GroupDetailNavbar } from "@/components/features/group-detail/group-detail-navbar";
import { GroupDetailSectionsButtons } from "@/components/features/group-detail/group-detail-sections-buttons";
import { GroupDetails } from "@/components/features/group-detail/group-details";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params; // Next.js stated that `params` need to be awaited
  const group = await fetchGroupByIdWithSummary(id);

  return (
    <main className="px-5 pb-10 pt-[80px] space-y-8 min-h-screen">
      <GroupDetailNavbar title={group.title} />
      <GroupDetails group={group} />
      <GroupDetailSectionsButtons />
    </main>
  );
}
