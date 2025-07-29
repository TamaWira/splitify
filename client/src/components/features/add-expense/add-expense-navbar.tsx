"use client";

import { NavbarWithBackButton } from "@/components/shared/navbar-with-back-button";
import { usePathname } from "next/navigation";

export function AddExpenseNavbar() {
  const pathname = usePathname();

  // Split the path and remove the last segment (add-expense)
  const pathSegments = pathname.split("/").filter(Boolean);
  const previousUrl =
    "/" + pathSegments.slice(0, -1).join("/") + "?section=expenses";

  return (
    <NavbarWithBackButton backHref={previousUrl}>
      <h1>Add Expense</h1>
    </NavbarWithBackButton>
  );
}
