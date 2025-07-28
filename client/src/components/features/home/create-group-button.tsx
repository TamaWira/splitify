import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CreateGroupButton() {
  return (
    <div className="flex justify-center">
      <Button asChild>
        <Link href="/groups/create">+ Create New Group</Link>
      </Button>
    </div>
  );
}
