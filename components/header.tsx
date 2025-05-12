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
    <header className=" mb-5">
      <div className=" container mx-auto p-4 flex justify-between items-center shadow-md">
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
      </div>
    </header>
  );
}
