import { Badge } from "@/components/ui/badge";
import { GroupSummary } from "@/types/groups";

export function GroupListRowRightBadge({ group }: { group: GroupSummary }) {
  return (
    <>
      {group.isSettled ? (
        <Badge variant="success">Fulfilled</Badge>
      ) : (
        <Badge variant="warning">Unsettled: ${group.unsettledAmount}</Badge>
      )}
    </>
  );
}
