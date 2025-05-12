import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className=" mt-5">
      <div className="container mx-auto p-4 flex justify-center md:justify-between items-center shadow-md flex-wrap md:flex-nowrap">
        <div className="flex items-center space-x-4 ">
          <Link href="/" className="hover:opacity-80 flex items-center">
            <Image
              src="/milk.png"
              alt="Milk Track Logo"
              width={32}
              height={32}
              className="inline-block w-8 h-8 mr-2"
            />
            Milk Track
          </Link>
          <Link href="https://www.facebook.com" target="_blank">
            <Facebook className="w-6 h-6 hover:opacity-80" />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <Twitter className="w-6 h-6 hover:opacity-80" />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Instagram className="w-6 h-6 hover:opacity-80" />
          </Link>
        </div>
        <div className="text-xs mt-2 md:mt-0 text-gray-500 text-center md:text-right w-full md:w-auto">
          © {new Date().getFullYear()} MilkTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
