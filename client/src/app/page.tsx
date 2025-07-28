import { fetchGroupSummaries } from "@/actions/groups";
import { CreateGroupButton } from "@/components/features/home/create-group-button";
import { GroupList } from "@/components/features/home/group-list/group-list";
import { Hero } from "@/components/features/home/hero";
import { HomeNavbar } from "@/components/features/home/home-navbar";
import { SplashScreenWithInit } from "@/components/shared/splash-screen-with-init";
import { Skeleton } from "@/components/ui/skeleton";
import { getSplitifyClientId } from "@/utils/get-splitify-client-id";
import { Suspense } from "react";

export default async function Home() {
  const clientId = await getSplitifyClientId();

  if (!clientId) return <SplashScreenWithInit />;

  const groups = await fetchGroupSummaries(clientId);

  const unsettledGroups = groups.filter((group) => !group.isSettled);
  const fulfilledGroups = groups.filter((group) => group.isSettled);

  return (
    <div>
      <main className="px-5 pb-10 pt-[80px] space-y-10 min-h-screen">
        <HomeNavbar />
        <Hero />

        {/* Group List Per Category */}
        {unsettledGroups && unsettledGroups.length > 0 && (
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <GroupList
              type="Unsettled"
              seeAllHref="#"
              groups={unsettledGroups}
            />
          </Suspense>
        )}

        {fulfilledGroups && fulfilledGroups.length > 0 && (
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <GroupList
              type="Fulfilled"
              seeAllHref="#"
              groups={fulfilledGroups}
            />
          </Suspense>
        )}

        <CreateGroupButton />
      </main>
    </div>
  );
}
