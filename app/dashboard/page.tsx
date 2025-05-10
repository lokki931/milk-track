"use client";

import { useSession, signOut } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

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
