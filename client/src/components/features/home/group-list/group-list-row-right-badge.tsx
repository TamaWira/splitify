import { Badge } from "@/app/components/ui/badge";
import { TGroupList } from "@/app/types/group";

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
