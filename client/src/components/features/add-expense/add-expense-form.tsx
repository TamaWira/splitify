"use client";

import { addExpense } from "@/actions/expenses";
import { ExpenseFulfillmentSwitch } from "@/components/shared/expense-fulfillment-switch";
import { useParticipantsByGroupId } from "@/hooks/useParticipantsByGroupId";
import { CreateExpenseDto } from "@/types/expenses";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormActionButtonsClientWrapper } from "../../shared/form-action-buttons-client-wrapper";
import { ExpenseDetailsForm } from "./expense-details-form";
import { SplitDetailsForm } from "./split-details-form";

type AddExpenseProps = {
  groupId: string;
};

export function AddExpenseForm({ groupId }: AddExpenseProps) {
  // ===== Hooks =====
  const router = useRouter();

  // ===== States =====
  const [amount, setAmount] = useState(0);
  const { participantOptions, isFetchingParticipants } =
    useParticipantsByGroupId(groupId);

  // ===== Handlers =====
  /**
   * Handles the form submission.
   * @param e
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const title = formData.get("title") as string;
      const amount = parseFloat(formData.get("amount") as string);
      const category = formData.get("category") as string;
      const paidBy = formData.get("paid-by") as string;
      const participants = formData.getAll("participants") as string[];
      const share = amount / participants.length;
      const isSettled = formData.get("is-settled") as string;

      const payload: CreateExpenseDto = {
        groupId,
        title,
        amount,
        category,
        paidBy,
        participants,
        share,
        isSettled: isSettled === "true",
      };

      const data = await addExpense(payload);

      if (!data) {
        console.error("Failed to add expense");
        return;
      }
      router.push(`/groups/${groupId}?section=expenses`);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the amount change event.
   * @param event
   */
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ExpenseDetailsForm
        participantOptions={participantOptions}
        handleAmountChange={handleAmountChange}
      />
      <SplitDetailsForm
        participantsOptions={participantOptions}
        isFetchingParticipants={isFetchingParticipants}
        amount={amount}
      />
      <ExpenseFulfillmentSwitch />
      <FormActionButtonsClientWrapper backSection="expenses" />
    </form>
  );
}
