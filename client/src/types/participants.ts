export type Participant = {
  id: string;
  groupId: string;
  name: string;
  email?: string;
};

export type ParticipantDetails = Omit<Participant, "groupId">;
