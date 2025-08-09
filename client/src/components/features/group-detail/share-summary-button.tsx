"use client";

import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useState } from "react";

type Props = {
  groupId: string;
};

export function ShareSummaryButton({ groupId }: Props) {
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const handleShare = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/groups/${groupId}/summary-text`
      );
      if (!res.ok) throw new Error("Failed to fetch summary");

      const data = await res.json();

      if (navigator.share) {
        await navigator.share({
          title: "Split Summary",
          text: data.data,
        });
      } else {
        await navigator.clipboard.writeText(data.data);
        alert("Summary copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to share summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full"
      variant="outline"
    >
      <Share size={16} />
      <p>Share</p>
    </Button>
  );
}
