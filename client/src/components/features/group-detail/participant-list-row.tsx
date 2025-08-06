"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Participant } from "@/types/participants";
import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { ManageParticipantDialog } from "../manage-participants/manage-participant-dialog";
import { DeleteParticipantDialog } from "../manage-participants/delete-participant-dialog";

type Props = {
  participant: Participant;
  withActions?: boolean;
};

export function ParticipantListRow({
  participant,
  withActions = false,
}: Props) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const handleOpenDialog = () => setIsOpenDialog(true);
  const handleCloseDialog = () => setIsOpenDialog(false);
  const handleDeleteParticipant = () => setIsOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setIsOpenDeleteDialog(false);

  const avatar = participant.name[0].toUpperCase();

  return (
    <Card>
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-hue-green rounded-full w-8 h-8 font-semibold text-md text-primary-green">
            {avatar}
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-lg">{participant.name}</p>
            {participant.email && (
              <p className="font-medium text-gray-500 text-xs">
                {participant.email}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {withActions && (
            <>
              <Button
                variant="ghost"
                className="m-0 p-0"
                onClick={handleOpenDialog}
              >
                <SquarePen size={20} className="text-gray-500" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="m-0 p-0"
                onClick={handleDeleteParticipant}
              >
                <Trash2 size={20} className="text-red-400" />
              </Button>
            </>
          )}
        </div>
        <ManageParticipantDialog
          isDialogOpen={isOpenDialog}
          groupId={participant.groupId}
          handleCloseDialog={handleCloseDialog}
          selectedParticipant={participant}
        />
        <DeleteParticipantDialog
          participant={participant}
          isDialogOpen={isOpenDeleteDialog}
          handleCloseDialog={handleCloseDeleteDialog}
        />
      </div>
    </Card>
  );
}
