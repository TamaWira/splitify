import { Badge } from "@/components/ui/badge";
import { GroupSummary } from "@/types/groups";
import { CircleDollarSign, UserRound } from "lucide-react";

export function GroupListRowLeftBadges({ group }: { group: GroupSummary }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success">
        <UserRound size={16} />
        <p>
          {group.participantCount}{" "}
          {group.participantCount > 1 ? "People" : "Person"}
        </p>
      </Badge>
      <Badge variant="primary">
        <CircleDollarSign size={16} />
        <p>
          {group.expenseCount} Expense
          {group.expenseCount > 1 ? "s" : ""}
        </p>
      </Badge>
    </div>
  );
}
