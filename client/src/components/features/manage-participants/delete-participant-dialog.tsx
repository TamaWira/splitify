import { deleteParticipant } from "@/actions/participants";
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
  participant: Participant;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
};

export function DeleteParticipantDialog({
  participant,
  isDialogOpen,
  handleCloseDialog,
}: Props) {
  const handleSubmit = async () =>
    await deleteParticipant(participant.id, participant.groupId);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Participant</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <p>Are you sure you want to delete the participant?</p>
        <form className="flex flex-col gap-5" action={handleSubmit}>
          <input name="id" defaultValue={participant.id} hidden />
          <input name="group-id" defaultValue={participant.groupId} hidden />
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
