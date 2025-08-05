"use client";

import { SectionHeader } from "@/components/features/group-detail/section-header";

type Props = {
  onClickHeaderButton: () => void;
};

export function ManageParticipantsHeader({ onClickHeaderButton }: Props) {
  return (
    <SectionHeader
      title="Participants"
      actionLabel="+ Add Person"
      action={onClickHeaderButton}
    />
  );
}
