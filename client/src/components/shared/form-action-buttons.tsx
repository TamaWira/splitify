"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type FormActionButtonsProps = {
  cancelHref: string;
  cancelText: string;
  submitText: string;
};

export function FormActionButtons({
  cancelHref,
  cancelText,
  submitText,
}: FormActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="rounded-full" asChild>
        <Link href={cancelHref}>{cancelText}</Link>
      </Button>
      <Button type="submit">{submitText}</Button>
    </div>
  );
}
