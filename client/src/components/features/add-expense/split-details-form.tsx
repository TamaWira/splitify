"use client";

import { CheckboxWithLabel } from "@/components/shared/checkbox-with-label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SplitDetailsFormHeader } from "./split-details-form-header";
import { ExpenseWithParticipants } from "@/types/expenses";

type SplitDetailsFormProps = {
  participantsOptions: { value: string; label: string }[];
  isFetchingParticipants: boolean;
  amount: number;
  expense?: ExpenseWithParticipants;
};

export function SplitDetailsForm({
  participantsOptions,
  isFetchingParticipants,
  amount,
  expense,
}: SplitDetailsFormProps) {
  // ===== States =====
  const [checkedList, setCheckedList] = useState<string[]>(
    expense ? expense.participants.map((p) => p.participantId) : []
  );

  // ===== Derived States =====
  const totalChecked = checkedList.length;
  const splitAmount = amount / totalChecked;

  // ===== Handlers =====
  const handleCheckboxChange = (value: string) => {
    if (checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    } else {
      setCheckedList([...checkedList, value]);
    }
  };

  return (
    <Card>
      <div className="space-y-5">
        <SplitDetailsFormHeader
          totalChecked={totalChecked}
          splitAmount={splitAmount}
        />
        <div className="flex flex-col gap-3">
          {isFetchingParticipants ? (
            <div>Loading...</div>
          ) : (
            participantsOptions &&
            participantsOptions.length > 0 &&
            participantsOptions.map((participant) => (
              <CheckboxWithLabel
                key={participant.value}
                id={participant.value}
                label={participant.label}
                checked={checkedList.includes(participant.value)}
                onChange={() => handleCheckboxChange(participant.value)}
              />
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
