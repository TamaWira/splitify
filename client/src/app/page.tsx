import { CreateGroupButton } from "@/components/features/home/create-group-button";
import { GroupList } from "@/components/features/home/group-list/group-list";
import { Hero } from "@/components/features/home/hero";
import { HomeNavbar } from "@/components/features/home/home-navbar";
import { SplashScreenWithInit } from "@/components/shared/splash-screen-with-init";
import { groupList } from "@/lib/mock-data";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get("splitify_client_id")?.value;

  if (!clientId) return <SplashScreenWithInit />;

  const unsettledGroups = groupList.filter((group) => !group.isSettled);
  const fulfilledGroups = groupList.filter((group) => group.isSettled);

  return (
    <div>
      <main className="px-5 pb-10 pt-[80px] space-y-10 min-h-screen">
        <HomeNavbar />
        <Hero />

        {/* Group List Per Category */}
        {unsettledGroups && unsettledGroups.length > 0 && (
          <GroupList type="Unsettled" seeAllHref="#" groups={unsettledGroups} />
        )}

        {fulfilledGroups && fulfilledGroups.length > 0 && (
          <GroupList type="Fulfilled" seeAllHref="#" groups={fulfilledGroups} />
        )}

        <CreateGroupButton />
      </main>
    </div>
  );
}
