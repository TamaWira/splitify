"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ParticipantDetails } from "@/types/participant";
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
          onClick={handleAddParticipant}
          className="text-center rounded-full py-2 border border-gray-500/10 w-full bg-white text-black"
        >
          + Add Participant
        </Button>
      </div>
    </Card>
  );
}
