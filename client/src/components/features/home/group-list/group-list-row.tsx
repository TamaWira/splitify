import { TGroupList } from "@/app/types/group";
import { GroupListRowHeader } from "./group-list-row-header";
import { GroupListRowLeftBadges } from "./group-list-row-left-badges";
import { GroupListRowRightBadge } from "./group-list-row-right-badge";
import { Card } from "@/components/ui/card";

export function GroupListRow({ group }: { group: TGroupList }) {
  return (
    <Card key={group.id}>
      <div className="space-y-1">
        <GroupListRowHeader group={group} />

        <div className="flex items-center justify-between flex-wrap">
          <GroupListRowLeftBadges group={group} />
          <GroupListRowRightBadge group={group} />
        </div>
      </div>
    </Card>
  );
}
