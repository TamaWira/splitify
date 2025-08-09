"use client";

import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { getClientMetadata } from "@/utils/getClientMetadata";
import { SplashScreen } from "../features/home/splash-screen";

export function SplashScreenWithInit() {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const metadata = getClientMetadata();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/clients`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metadata),
        }
      );

      const { data } = await res.json();

      const clientId = data.id;

      if (!clientId) throw new Error("Client ID not found");

      const cookie = `Bearer ${clientId}`;

      setCookie("splitify_client_id", cookie, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      router.refresh(); // re-evaluates the server component
    };

    init();
  }, [router]);

  return <SplashScreen />;
}
