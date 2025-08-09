"use client";

import { FormActionButtons } from "@/components/shared/form-action-buttons";
import { ExpenseWithParticipants } from "@/types/expenses";
import { usePathname } from "next/navigation";

type Props = {
  backSection: string;
  backHref?: string | null;
  expense?: ExpenseWithParticipants;
};

export function FormActionButtonsClientWrapper({
  backSection,
  backHref,
  expense,
}: Props) {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const previousUrl =
    "/" + pathSegments.slice(0, -1).join("/") + `?section=${backSection}`;

  return (
    <FormActionButtons
      cancelHref={backHref ? backHref : previousUrl}
      cancelText="Cancel"
      submitText={expense ? "Update Expense" : "Add Expense"}
    />
  );
}
