import { Card } from "@/components/ui/card";

export function GroupDetailsForm() {
  return (
    <Card>
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Group Details</h2>
        <div className="space-y-1">
          <p className="text-gray-500/80 font-medium">Group Name</p>
          <input
            required
            type="text"
            name="group-title"
            placeholder="e.g., Weekend Trip, Office Lunch"
            className="w-full px-4 py-2 text-sm text-gray-500 font-semibold rounded-full border border-gray-500/10 bg-[#FAFAFA]"
          />
        </div>
      </div>
    </Card>
  );
}
