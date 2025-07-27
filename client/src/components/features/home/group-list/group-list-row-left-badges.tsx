import { TGroupList } from "@/app/types/group";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, UserRound } from "lucide-react";

export function GroupListRowLeftBadges({ group }: { group: TGroupList }) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="success">
        <UserRound size={16} />
        <p>
          {group.numOfPeople} {group.numOfPeople > 1 ? "People" : "Person"}
        </p>
      </Badge>
      <Badge variant="primary">
        <CircleDollarSign size={16} />
        <p>
          {group.numOfExpenses} Expense
          {group.numOfExpenses > 1 ? "s" : ""}
        </p>
      </Badge>
    </div>
  );
}
