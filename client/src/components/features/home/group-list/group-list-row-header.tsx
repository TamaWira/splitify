import { GroupSummary } from "@/types/groups";
import { formatRupiah } from "../../../../utils/format-to-rupiah";

export function GroupListRowHeader({ group }: { group: GroupSummary }) {
  return (
    <div className="flex justify-between items-center gap-10 font-semibold text-lg">
      <p>{group.title}</p>
      <p>{formatRupiah(group.totalAmount)}</p>
    </div>
  );
}
