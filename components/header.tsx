// header tsx
"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 w-full max-w-7xl m-auto flex justify-between items-center p-4 shadow-md z-10">
      <Link
        href="/"
        className="text-2xl font-bold hover:opacity-80 flex items-center"
      >
        <Image
          src="/milk.png"
          alt="Milk Track Logo"
          width={32}
          height={32}
          className="inline-block w-8 h-8 mr-2"
        />
        Milk Track
      </Link>
      <nav>
        <ul className="flex space-x-4 items-center">
          {session ? (
            <>
              <li>
                <Link href="/dashboard" className="hover:opacity-80">
                  Dashboard
                </Link>
              </li>
              <li>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer"
                >
                  Sign Out
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login" className="hover:opacity-80">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:opacity-80">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
