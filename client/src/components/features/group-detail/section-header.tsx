"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  actionLabel: string;
  href?: string;
  action?: () => void;
};

export function SectionHeader({
  title,
  actionLabel,
  action = () => {},
  href,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-semibold">{title}</p>
      <Button type="button" onClick={action}>
        {href ? <Link href={href}>{actionLabel}</Link> : actionLabel}
      </Button>
    </div>
  );
}
