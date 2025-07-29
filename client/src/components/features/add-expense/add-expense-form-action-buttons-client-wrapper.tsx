"use client";

import { FormActionButtons } from "@/components/shared/form-action-buttons";
import { usePathname } from "next/navigation";

export function AddExpenseFormActionButtonsClientWrapper() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const previousUrl =
    "/" + pathSegments.slice(0, -1).join("/") + "?section=expenses";

  return (
    <FormActionButtons
      cancelHref={previousUrl}
      cancelText="Cancel"
      submitText="Add Expense"
    />
  );
}
