import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Milk, BarChart, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full h-72 md:h-[450px]">
          <Image
            src="/farm.jpg"
            alt="Farm"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            MilkTrack
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            A modern solution for dairy production tracking.
          </p>
          <Link href="/dashboard">
            <Button className="cursor-pointer">Start Tracking</Button>
          </Link>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Feature
              icon={<Milk className="text-green-600 w-6 h-6" />}
              title="Milk Records"
              description="Log daily data: liters, fat %, price."
            />
            <Feature
              icon={<BarChart className="text-green-600 w-6 h-6" />}
              title="Statistics"
              description="Monthly summaries & income reports."
            />
            <Feature
              icon={<ShieldCheck className="text-green-600 w-6 h-6" />}
              title="Secure Access"
              description="Personal accounts and protected data."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow hover:shadow-md transition flex flex-col items-start">
      <div className="mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
