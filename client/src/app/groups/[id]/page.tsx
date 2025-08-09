import { fetchGroupByIdWithSummary } from "@/actions/groups";
import { ExpensesSection } from "@/components/features/group-detail/expenses-section";
import { GroupDetailNavbar } from "@/components/features/group-detail/group-detail-navbar";
import { GroupDetailSectionsButtons } from "@/components/features/group-detail/group-detail-sections-buttons";
import { GroupDetails } from "@/components/features/group-detail/group-details";
import { ParticipantsSection } from "@/components/features/group-detail/participants-section";
import { SplitSummarySection } from "@/components/features/group-detail/split-summary/split-summary-section";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ section: string }>;
}) {
  const { id } = await params;
  const { section } = await searchParams;

  const group = await fetchGroupByIdWithSummary(id);

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <GroupDetailNavbar title={group.title} />
      <GroupDetails group={group} />
      <GroupDetailSectionsButtons />

      {section === "expenses" ? (
        <ExpensesSection groupId={id} />
      ) : section === "participants" ? (
        <ParticipantsSection groupId={id} />
      ) : (
        <SplitSummarySection groupId={id} />
      )}
    </main>
  );
}
