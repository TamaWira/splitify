"use client";

import { SectionHeader } from "@/components/features/group-detail/section-header";
import { useState } from "react";
import { ManageParticipantDialog } from "./manage-participant-dialog";

export function ManageParticipantsHeader({ groupId }: { groupId: string }) {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const handleOpenModal = () => setIsModelOpen(true);
  const handleCloseModal = () => setIsModelOpen(false);

  return (
    <>
      <SectionHeader
        title="Participants"
        actionLabel="+ Add Person"
        action={handleOpenModal}
      />
      <ManageParticipantDialog
        isDialogOpen={isModalOpen}
        handleCloseDialog={handleCloseModal}
        selectedParticipant={null}
        groupId={groupId}
      />
    </>
  );
}
