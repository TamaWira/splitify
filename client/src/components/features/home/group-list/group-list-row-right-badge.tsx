import { Badge } from "@/components/ui/badge";
import { GroupSummary } from "@/types/groups";

export function GroupListRowRightBadge({ group }: { group: GroupSummary }) {
  return (
    <>
      {group.isFullySettled ? (
        <Badge variant="success">Fulfilled</Badge>
      ) : (
        <Badge variant="warning">
          <p className="text-[10px]">
            Unsettled:{" "}
            <span className="font-extrabold">${group.unsettledAmount}</span>
          </p>
        </Badge>
      )}
    </>
  );
}
