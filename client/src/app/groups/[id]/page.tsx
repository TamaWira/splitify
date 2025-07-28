import { fetchGroupByIdWithSummary } from "@/actions/groups";
import { ExpensesSection } from "@/components/features/group-detail/expenses-section";
import { GroupDetailNavbar } from "@/components/features/group-detail/group-detail-navbar";
import { GroupDetailSectionsButtons } from "@/components/features/group-detail/group-detail-sections-buttons";
import { GroupDetails } from "@/components/features/group-detail/group-details";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { section: string };
}) {
  const { id } = await params; // Next.js stated that `params` need to be awaited
  const { section } = await searchParams;
  const group = await fetchGroupByIdWithSummary(id);

  return (
    <main className="px-5 pb-10 pt-[80px] space-y-8 min-h-screen">
      <GroupDetailNavbar title={group.title} />
      <GroupDetails group={group} />
      <GroupDetailSectionsButtons />

      {section === "summary" || !section ? (
        <div>Summary</div>
      ) : section === "expenses" ? (
        <ExpensesSection groupId={id} />
      ) : section === "participants" ? (
        <div>Participants</div>
      ) : (
        <></>
      )}
    </main>
  );
}
