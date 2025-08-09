"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParticipantDetails } from "@/types/participants";
import { useState } from "react";
import { ParticipantsDetailsFormRow } from "./participants-details-form-row";

export function ParticipantsDetailsForm() {
  const [participants, setParticipants] = useState<ParticipantDetails[]>([
    { id: Date.now().toString(), name: "", email: "" },
  ]);

  // ===== Handlers
  /**
   * Add participant handlers
   */
  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now().toString(), name: "", email: "" },
    ]);
  };

  return (
    <Card>
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Participants</h2>
        <div className="space-y-3">
          {/* Participants Section */}
          {participants.length > 0 &&
            participants.map((participant) => (
              <ParticipantsDetailsFormRow
                key={participant.id}
                participant={participant}
                participants={participants}
                setParticipants={setParticipants}
              />
            ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAddParticipant}
        >
          + Add Participant
        </Button>
      </div>
    </Card>
  );
}
