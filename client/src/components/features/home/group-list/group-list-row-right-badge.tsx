import { TGroupList } from "@/app/types/group";
import { Badge } from "@/components/ui/badge";

export function GroupListRowRightBadge({ group }: { group: TGroupList }) {
  return (
    <>
      {group.isSettled ? (
        <Badge variant="success">Fulfilled</Badge>
      ) : (
        <Badge variant="warning">Unsettled: ${group.notSettledAmount}</Badge>
      )}
    </>
  );
}
