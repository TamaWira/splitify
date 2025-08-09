import { ParticipantDetails } from "@/types/participants";
import { ParticipantDetailsHeader } from "./participant-details-header";
import { ParticipantDetailsInput } from "./participant-details-input";

type ParticipantsDetailsRowProps = {
  participant: ParticipantDetails;
  participants: ParticipantDetails[];
  setParticipants: React.Dispatch<React.SetStateAction<ParticipantDetails[]>>;
};

export function ParticipantsDetailsFormRow({
  participant,
  participants,
  setParticipants,
}: ParticipantsDetailsRowProps) {
  const index = participants.findIndex((item) => item.id === participant.id);

  // ===== Handlers

  /**
   * Delete participant from the list
   * @param {number} index - The index of the participant to delete
   */
  const handleDeleteParticipant = (index: number) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  };

  /**
   * Update participant name
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object
   */
  const handleUpdateParticipantNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParticipants = [...participants];
    newParticipants[index].name = e.target.value;
    setParticipants(newParticipants);
  };

  /**
   * Update participant email
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object
   */
  const handleUpdateParticipantEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParticipants = [...participants];
    newParticipants[index].email = e.target.value;
    setParticipants(newParticipants);
  };

  return (
    <div className="space-y-3 p-3 border border-gray-500/10 rounded-lg">
      {/* Header */}
      <ParticipantDetailsHeader
        handleDeleteParticipant={handleDeleteParticipant}
        index={index}
      />

      <ParticipantDetailsInput
        isRequired
        name="participant-name"
        value={participant.name}
        placeholder="Name"
        handleOnChange={handleUpdateParticipantNameChange}
      />

      <ParticipantDetailsInput
        name="participant-email"
        value={participant.email ?? ""}
        placeholder="Email (optional)"
        handleOnChange={handleUpdateParticipantEmailChange}
      />
    </div>
  );
}
