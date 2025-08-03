import { GroupSummary } from "@/types/groups";
import Link from "next/link";
import { GroupListCategoryHeader } from "./group-list-category-header";
import { GroupListRow } from "./group-list-row";

type GroupListProps = {
  type: string;
  seeAllHref: string;
  groups: GroupSummary[];
};

export function GroupList({ type, seeAllHref, groups }: GroupListProps) {
  if (groups && groups.length > 0)
    return (
      <div className="space-y-3">
        <GroupListCategoryHeader type={type} seeAllHref={seeAllHref} />

        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group.id}>
              <Link href={`/groups/${group.id}`}>
                <GroupListRow group={group} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}
