"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login", // go back to login after logout
        })
      }
    >
      Logout
    </button>
  );
}
