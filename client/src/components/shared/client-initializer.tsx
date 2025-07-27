"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { getClientMetadata } from "@/app/utils/getClientMetadata";
import { SplashScreen } from "../features/home/splash-screen";

export default function ClientInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(() => {
    const existingClientId = getCookie("splitify_client_id");
    return Boolean(existingClientId); // if true, skip splash immediately
  });

  useEffect(() => {
    const existingClientId = getCookie("splitify_client_id");

    if (existingClientId) return; // already ready

    const initialize = async () => {
      const metadata = getClientMetadata();
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metadata),
      });

      const { id: clientId } = await res.json();
      setCookie("splitify_client_id", clientId, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      setIsReady(true);
    };

    initialize();
  }, []);

  if (!isReady) return <SplashScreen />;
  return <>{children}</>;
}
