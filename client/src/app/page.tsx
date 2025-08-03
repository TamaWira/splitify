import { CreateGroupButton } from "@/components/features/home/create-group-button";
import { GroupListSection } from "@/components/features/home/group-list/group-list-section";
import { Hero } from "@/components/features/home/hero";
import { HomeNavbar } from "@/components/features/home/home-navbar";
import { SplashScreenWithInit } from "@/components/shared/splash-screen-with-init";
import { getSplitifyClientId } from "@/utils/get-splitify-client-id";

export default async function Home() {
  const clientId = await getSplitifyClientId();

  if (!clientId) return <SplashScreenWithInit />;

  return (
    <div>
      <main className="space-y-10 px-5 pt-[80px] pb-10 min-h-screen">
        <HomeNavbar />
        <Hero />
        <GroupListSection clientId={clientId} />
        <CreateGroupButton />
      </main>
    </div>
  );
}
