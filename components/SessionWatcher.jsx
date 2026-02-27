"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut();
    }
  }, [status]);

  return null;
}
