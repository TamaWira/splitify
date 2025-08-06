// To "refresh" the /manage-participants page which is a client component
"use client";

import { addParticipant, editParticipant } from "@/actions/participants";
import { InputWithLabel } from "@/components/shared/input-with-label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Participant } from "@/types/participants";

type Props = {
  groupId: string;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  selectedParticipant?: Participant | null;
};

export function ManageParticipantDialog({
  groupId,
  isDialogOpen,
  handleCloseDialog,
  selectedParticipant,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (selectedParticipant) {
      await editParticipant(formData);
    } else {
      await addParticipant(formData);
    }

    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Participant</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input name="id" defaultValue={selectedParticipant?.id} hidden />
          <input name="group-id" defaultValue={groupId} hidden />
          <InputWithLabel
            required
            label="Name"
            placeholder="Enter name"
            defaultValue={selectedParticipant?.name}
            type="text"
            name="name"
          />
          <InputWithLabel
            required
            label="Email (optional)"
            placeholder="Enter email"
            defaultValue={selectedParticipant?.email}
            type="text"
            name="email"
          />
          <div className="gap-3 grid grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
