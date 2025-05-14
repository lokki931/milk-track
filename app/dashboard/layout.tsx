import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MilkRecordProvider } from "@/context/MilkRecordContext";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  //loader
  const loader = (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="4"
          stroke="currentColor"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5 0a5.5 5.5 0 1 0 11 0A5.5 5.5 0 0 0 6.5 12z"
        />
      </svg>
    </div>
  );
  // Check if session is loading
  if (session === null) {
    return loader;
  }

  return (
    <>
      <MilkRecordProvider>{children}</MilkRecordProvider>
    </>
  );
}
