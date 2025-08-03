"use client";

import { NavbarWithBackButton } from "@/components/shared/navbar-with-back-button";
import { usePathname } from "next/navigation";

type ExpenseNavbarProps = {
  title: string;
};

export function ExpenseNavbar({ title }: ExpenseNavbarProps) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const previousUrl =
    "/" + pathSegments.slice(0, -2).join("/") + "?section=expenses";

  return (
    <NavbarWithBackButton backHref={previousUrl}>
      <h1>{title}</h1>
    </NavbarWithBackButton>
  );
}
