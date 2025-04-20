"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/general/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSession();
  const userName = user?.data?.user?.name || "User";
  const userImage = user?.data?.user?.image || "/profile.jpg";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const buttons = [
    {
      href: "/calendar",
      label: "Calendar",
      imageSrc: "/calendar.jpg",
    },
    {
      href: "/cabshare",
      label: "Cab Share",
      imageSrc: "/cab.jpg",
    },
    {
      href: "/lostfound",
      label: "Lost & Found",
      imageSrc: "/lostfound.jpg",
    },
    {
      href: "/foodmenu",
      label: "Food Menu",
      imageSrc: "/food.png",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Image
          src="/spinner.png"
          alt="Loading"
          width={128}
          height={128}
          className="animate-spin border-4 border-black/10 dark:border-white rounded-full shadow-xl"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Bar */}
      <Navbar />

      {/* Button Grid */}
      <div className="flex-1 p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {buttons.map((button, i) => (
            <Link
              key={i}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : undefined}
            >
              <div className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-white/20 shadow-lg">
                <Image
                  src={button.imageSrc}
                  alt={`${button.label} Button`}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration  duration-300">
                  {button.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Children (Nested Pages) */}
      {children}

    </div>
  );
}
