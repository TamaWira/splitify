"use client";

import { addExpense, editExpense } from "@/actions/expenses";
import { ExpenseFulfillmentSwitch } from "@/components/shared/expense-fulfillment-switch";
import { useParticipantsByGroupId } from "@/hooks/useParticipantsByGroupId";
import { CreateExpenseDto, ExpenseWithParticipants } from "@/types/expenses";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormActionButtonsClientWrapper } from "./form-action-buttons-client-wrapper";
import { ExpenseDetailsForm } from "../features/add-expense/expense-details-form";
import { SplitDetailsForm } from "../features/add-expense/split-details-form";
import {
  formatRupiahNoPrefix,
  parseRupiahStringToNumber,
} from "@/utils/currency";

type AddExpenseProps = {
  groupId: string;
  expense?: ExpenseWithParticipants;
};

export function ExpenseForm({ groupId, expense }: AddExpenseProps) {
  // ===== Hooks =====
  const router = useRouter();

  // ===== States =====
  const [amount, setAmount] = useState(expense ? expense.amount : 0);
  const [amountText, setAmountText] = useState<string>(
    formatRupiahNoPrefix(expense ? expense.amount : 0)
  );
  const { participantOptions, isFetchingParticipants } =
    useParticipantsByGroupId(groupId);

  // ----- Derived States -----
  const backHref = expense ? `/groups/${groupId}?section=expenses` : null;

  // ----- Effects -----
  useEffect(() => {
    setAmountText(formatRupiahNoPrefix(amount));
  }, [amount]);

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
      const isSettled = formData.get("is-settled") as string;

      const payload: CreateExpenseDto = {
        groupId,
        title,
        amount,
        category,
        paidBy,
        participants,
        isSettled: isSettled === "true",
      };

      const data = expense
        ? await editExpense(expense.id, payload)
        : await addExpense(payload);

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
  const handleAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      const next = parseRupiahStringToNumber(raw);
      setAmount(next);
      setAmountText(formatRupiahNoPrefix(next));
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ExpenseDetailsForm
        amount={amountText}
        expense={expense}
        participantOptions={participantOptions}
        handleAmountChange={handleAmountChange}
      />
      <SplitDetailsForm
        expense={expense}
        participantsOptions={participantOptions}
        isFetchingParticipants={isFetchingParticipants}
        amount={amount}
      />
      <ExpenseFulfillmentSwitch expense={expense} />
      <FormActionButtonsClientWrapper
        expense={expense}
        backHref={backHref}
        backSection="expenses"
      />
    </form>
  );
}
