"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function GroupDetailSectionsButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current section from URL params (defaults to 'summary')
  const currentSection = searchParams.get("section") || "summary";

  const handleSectionChange = useCallback(
    (section: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", section);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex justify-around items-center gap-1 bg-gray-200 p-1 rounded-full">
      <Button
        variant={currentSection === "summary" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${
          currentSection === "summary" ||
          !["expenses", "participants"].includes(currentSection) // To guard other section param (random)
            ? "bg-[#FAFAFA]"
            : ""
        }`}
        onClick={() => handleSectionChange("summary")}
      >
        Summary
      </Button>
      <Button
        variant={currentSection === "expenses" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${
          currentSection === "expenses" ? "bg-[#FAFAFA]" : ""
        }`}
        onClick={() => handleSectionChange("expenses")}
      >
        Expenses
      </Button>
      <Button
        variant={currentSection === "participants" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${
          currentSection === "participants" ? "bg-[#FAFAFA]" : ""
        }`}
        onClick={() => handleSectionChange("participants")}
      >
        Participants
      </Button>
    </div>
  );
}
