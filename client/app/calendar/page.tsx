"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Login() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);

  // fake 500ms spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
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

  if (status !== "authenticated") {
    redirect("/auth");
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="w-full h-28 flex items-center justify-between px-8 shadow-md">
        <div className="flex items-center gap-4">
          <Image src="/spinner.png" alt="Logo" width={40} height={40} />
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Image
            src="/profile.jpg"
            alt="Account"
            width={48}
            height={48}
            className="rounded-full object-cover cursor-pointer border-2 border-black/10 dark:border-white"
          />
        </div>
      </div>

      {/* Fullscreen Calendar */}
      <div className="flex-1 min-h-0">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=92734038c6cced005a2eda9a3c6350a548b06b1966f1e449c5759021253c1670%40group.calendar.google.com&ctz=Asia%2FKolkata"
          className="border-none w-full h-full"
          scrolling="no"
        />
      </div>
    </div>
  );
}
