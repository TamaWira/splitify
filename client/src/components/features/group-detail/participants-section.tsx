import { ParticipantList } from "./participant-list";
import { SectionHeader } from "./section-header";

type Props = {
  groupId: string;
};

export function ParticipantsSection({ groupId }: Props) {
  return (
    <div className="space-y-3">
      <SectionHeader
        title="Participants"
        actionLabel="+ Manage"
        href={`/groups/${groupId}/manage-participants`}
      />

      <ParticipantList groupId={groupId} />
    </div>
  );
}
