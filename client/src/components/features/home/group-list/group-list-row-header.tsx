import { TGroupList } from "@/app/types/group";

export function GroupListRowHeader({ group }: { group: TGroupList }) {
  return (
    <div className="flex items-center justify-between font-semibold text-lg gap-10">
      <p>{group.title}</p>
      <p>${group.totalAmount}</p>
    </div>
  );
}
