import { GroupSummary } from "@/types/groups";
import { GroupListRowLeftBadges } from "../home/group-list/group-list-row-left-badges";
import { ShareSummaryButton } from "./share-summary-button";

type GroupDetailsProps = {
  group: GroupSummary;
};

export async function GroupDetails({ group }: GroupDetailsProps) {
  return (
    <>
      <div className="flex justify-between">
        <div className="space-y-3">
          <div>
            <h2 className="font-bold text-2xl">${group.totalAmount}</h2>
            <p className="text-gray-500">Total expenses</p>
          </div>
          <GroupListRowLeftBadges group={group} />
        </div>
        <ShareSummaryButton groupId={group.id} />
      </div>
    </>
  );
}
