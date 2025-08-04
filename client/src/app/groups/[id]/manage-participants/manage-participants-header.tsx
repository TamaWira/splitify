"use client";

import { SectionHeader } from "@/components/features/group-detail/section-header";

export function ManageParticipantsHeader() {
  const sectionHeaderOnClick = () => {
    alert("Hi there");
  };

  return (
    <SectionHeader
      title="Participants"
      actionLabel="+ Add Person"
      action={sectionHeaderOnClick}
    />
  );
}
