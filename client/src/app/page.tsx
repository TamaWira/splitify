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
      <HomeNavbar />
      <main className="px-5 py-10 space-y-10 min-h-screen">
        <Hero />

        {/* Group List Per Category */}
        <GroupList type="Unsettled" seeAllHref="#" groups={unsettledGroups} />
        <GroupList type="Fulfilled" seeAllHref="#" groups={fulfilledGroups} />
      </main>
    </div>
  );
}
