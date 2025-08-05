// client component on purpose
// to simplify development
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ParticipantList } from "@/components/features/group-detail/participant-list";
import { ManageParticipantDialog } from "@/components/features/manage-participants/manage-participant-dialog";
import { ManageParticipantsNavbar } from "@/components/features/manage-participants/manage-participants-navbar";
import { ManageParticipantsHeader } from "@/components/features/manage-participants/manage-participants-header";
import { Participant } from "@/types/participants";

export default function Page() {
  const params = useParams();
  const groupId = params.id as string;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSelectParticipant = (participant: Participant) => {
    setSelectedParticipant(participant);
    setIsDialogOpen(true);
  };

  return (
    <main className="space-y-8 px-5 pt-[80px] pb-10 min-h-screen">
      <ManageParticipantsNavbar />
      <ManageParticipantsHeader onClickHeaderButton={handleOpenDialog} />
      <ParticipantList
        groupId={groupId}
        handleSelectParticipant={handleSelectParticipant}
        rowsWithActions
      />
      <ManageParticipantDialog
        selectedParticipant={selectedParticipant}
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
      />
    </main>
  );
}
