import { fetchSplitSummary } from "@/lib/api/groups";
import { SplitSummaryRow } from "./split-summary-row";

type SplitSummarySectionProps = {
  groupId: string;
};

export async function SplitSummarySection({
  groupId,
}: SplitSummarySectionProps) {
  const summaries = await fetchSplitSummary(groupId);

  return (
    <div className="flex flex-col gap-3">
      {summaries && summaries.length > 0 ? (
        summaries.map((summary) => (
          <SplitSummaryRow key={summary.participantId} summary={summary} />
        ))
      ) : (
        <div className="text-center">
          <p className="">Add more expense.</p>
        </div>
      )}
    </div>
  );
}
