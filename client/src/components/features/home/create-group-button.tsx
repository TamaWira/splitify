import { PrimaryButton } from "@/components/shared/primary-button";

export function CreateGroupButton() {
  return (
    <div className="flex justify-center">
      <PrimaryButton type="link" href="/groups/create">
        + Create Group
      </PrimaryButton>
    </div>
  );
}
