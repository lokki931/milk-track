"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;
  return (
    <>
      <p>Welcome, {session.user.email}</p>
      {/*signOut is redirect to home page */}
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </>
  );
};
export default Dashboard;
