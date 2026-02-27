"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/app/page.module.css";

export default function PopupMenu() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <>
      {/* Trigger */}
      <a
        onClick={() => setOpen(true)}
        className={styles.link}
        aria-label="Menu"
      >
        <svg
          className={styles.logo}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={22}
          height={22}
          color={"#000000"}
          fill={"none"}
        >
          {/* https://hugeicons.com/icon/more-vertical-square-02?style=stroke-rounded */}
          <path
            d="M11.992 12H12.001"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9842 16H11.9932"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M11.9998 8H12.0088"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M2.48438 12C2.48438 7.52166 2.48438 5.28249 3.87562 3.89124C5.26686 2.5 7.50603 2.5 11.9844 2.5C16.4627 2.5 18.7019 2.5 20.0931 3.89124C21.4844 5.28249 21.4844 7.52166 21.4844 12C21.4844 16.4783 21.4844 18.7175 20.0931 20.1088C18.7019 21.5 16.4627 21.5 11.9844 21.5C7.50603 21.5 5.26686 21.5 3.87562 20.1088C2.48438 18.7175 2.48438 16.4783 2.48438 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          ></path>
        </svg>
        Menu
      </a>

      {/* Popup */}
      {open && (
        <div className={styles.overlay}>
          <div className={styles.menu}>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <ul>
              <li onClick={() => setOpen(false)}>Profile</li>
              <li onClick={() => setOpen(false)}>Settings</li>

              {/* 🔐 Auth action */}
              {!isLoggedIn ? (
                <li
                  onClick={() => {
                    setOpen(false);
                    signIn("google");
                  }}
                >
                  Login
                </li>
              ) : (
                <li
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                >
                  Logout
                </li>
              )}

              {/* 👤 Member only when logged in */}
              {isLoggedIn && <li onClick={() => setOpen(false)}>Member</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
