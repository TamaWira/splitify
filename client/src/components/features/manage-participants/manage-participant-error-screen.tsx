import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ManageParticipantPageErrorScreen() {
  return (
    <div className="flex justify-center items-center p-5 w-full h-screen">
      <div className="border border-red-500 rounded-lg">
        <p>Error! Please go back</p>
        <Link href="/">
          <Button variant="destructive">Go back to home</Button>
        </Link>
      </div>
    </div>
  );
}
