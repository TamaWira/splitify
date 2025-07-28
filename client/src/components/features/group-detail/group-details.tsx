import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { GroupListRowLeftBadges } from "../home/group-list/group-list-row-left-badges";
import { GroupSummary } from "@/types/groups";

type GroupDetailsProps = {
  group: GroupSummary;
};

export function GroupDetails({ group }: GroupDetailsProps) {
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
        <div>
          <Button
            className="flex items-center gap-5 rounded-full"
            variant="outline"
          >
            <Share />
            <p>Share</p>
          </Button>
        </div>
      </div>
    </>
  );
}
