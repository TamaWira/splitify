import { Card } from "@/components/ui/card";
import { SplitSummary } from "@/types/groups";

type SplitSummaryRowProps = {
  summary: SplitSummary;
};

export function SplitSummaryRow({ summary }: SplitSummaryRowProps) {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">{summary.participantName}</p>
        <div className="text-right">
          <p
            className={`text-md font-semibold ${
              summary.category === "owes"
                ? "text-red-500"
                : "text-primary-green"
            }`}
          >
            {summary.category}
          </p>
          <p className="font-semibold text-xl">Rp{summary.amount}</p>
        </div>
      </div>
    </Card>
  );
}
