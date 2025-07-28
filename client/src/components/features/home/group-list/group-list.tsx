import { TGroupList } from "@/app/types/group";
import { GroupListCategoryHeader } from "./group-list-category-header";
import { GroupListRow } from "./group-list-row";
import Link from "next/link";

type GroupListProps = {
  type: string;
  seeAllHref: string;
  groups: TGroupList[];
};

export function GroupList({ type, seeAllHref, groups }: GroupListProps) {
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
