import { GroupSummary } from "@/types/groups";

export function GroupListRowHeader({ group }: { group: GroupSummary }) {
  return (
    <div className="flex items-center justify-between font-semibold text-lg gap-10">
      <p>{group.title}</p>
      <p>${group.totalAmount}</p>
    </div>
  );
}
