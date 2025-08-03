import { Badge } from "@/components/ui/badge";
import { GroupSummary } from "@/types/groups";
import { CircleDollarSign, UserRound } from "lucide-react";

export function GroupListRowLeftBadges({ group }: { group: GroupSummary }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success">
        <UserRound size={12} />
        <p className="text-[10px]">
          {group.participantsCount}{" "}
          {group.participantsCount > 1 ? "People" : "Person"}
        </p>
      </Badge>
      <Badge variant="primary">
        <CircleDollarSign size={12} />
        <p className="text-[10px]">
          {group.expensesCount} Expense
          {group.expensesCount > 1 ? "s" : ""}
        </p>
      </Badge>
    </div>
  );
}
