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
    [router, searchParams],
  );

  return (
    <div className="p-1 bg-gray-200 rounded-full flex items-center justify-around gap-1">
      <Button
        variant={currentSection === "summary" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${currentSection === "summary" ? "bg-[#FAFAFA]" : ""}`}
        onClick={() => handleSectionChange("summary")}
      >
        Summary
      </Button>
      <Button
        variant={currentSection === "expenses" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${currentSection === "expenses" ? "bg-[#FAFAFA]" : ""}`}
        onClick={() => handleSectionChange("expenses")}
      >
        Expenses
      </Button>
      <Button
        variant={currentSection === "participants" ? "outline" : "ghost"}
        className={`rounded-full flex-1 ${currentSection === "participants" ? "bg-[#FAFAFA]" : ""}`}
        onClick={() => handleSectionChange("participants")}
      >
        Participants
      </Button>
    </div>
  );
}
