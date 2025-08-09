// import { fetchGroupSummaries } from "@/actions/groups";
import { Skeleton } from "@/components/ui/skeleton";
import { safeFetch } from "@/lib/safeFetch";
import { GroupSummary } from "@/types/groups";
import { Suspense } from "react";
import { GroupList } from "./group-list";
import { ServerErrorFallback } from "@/components/shared/server-error-fallback";

type GroupListSectionProps = {
  clientId: string;
};

export const fetchGroupSummaries = async (
  clientId: string
): Promise<GroupSummary[]> => {
  return safeFetch<GroupSummary[]>(
    `http://localhost:8000/api/groups?withSummary=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientId}`,
      },
      cache: "no-store",
    }
  );
};

export async function GroupListSection({ clientId }: GroupListSectionProps) {
  try {
    const groups = await fetchGroupSummaries(clientId);

    const unsettledGroups = groups.filter((group) => !group.isFullySettled);
    const fulfilledGroups = groups.filter((group) => group.isFullySettled);

    return (
      <Suspense fallback={<Skeleton className="w-full h-12" />}>
        <GroupList type="Unsettled" seeAllHref="#" groups={unsettledGroups} />
        <GroupList type="Fulfilled" seeAllHref="#" groups={fulfilledGroups} />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    return <ServerErrorFallback />;
  }
  // try {
  // } catch (e) {
  //   console.error(e);
  // }
  // try {
  //   const groups = await fetchGroupSummaries(clientId);

  //   const unsettledGroups = groups.filter((group) => !group.isFullySettled);
  //   const fulfilledGroups = groups.filter((group) => group.isFullySettled);

  //   console.log(unsettledGroups);

  //   return (
  //     <Suspense fallback={<Skeleton className="w-full h-12" />}>
  //       <GroupList type="Unsettled" seeAllHref="#" groups={unsettledGroups} />
  //       <GroupList type="Fulfilled" seeAllHref="#" groups={fulfilledGroups} />
  //     </Suspense>
  //   );
  // } catch (e) {
  //   console.error(e);
  //   return <ServerErrorFallback />;
  // }
}
