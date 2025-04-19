"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { GrGoogle } from "react-icons/gr";

export default function Login() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (status === "authenticated") {
    redirect("./dashboard");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-purple-800 to-fuchsia-800">
        <Image
          src="/spinner.png"
          alt="Loading"
          width={128}
          height={128}
          className="animate-spin border-4 border-white rounded-full shadow-xl"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-purple-800 to-fuchsia-800">
      <Card className="w-96 p-6 bg-black/70 border border-white/20 shadow-2xl backdrop-blur-md rounded-2xl flex flex-col justify-between h-[400px]">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src="/iiitb-logo.jpeg"
            alt="IIITB Logo"
            width={700}
            height={200}
            className="shadow-md"
          />
          <CardTitle className="text-center text-white text-2xl font-semibold pt-5">
            Welcome to IIITB Compass!
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col justify-end gap-4 mt-auto">
          <Button
            className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white border border-white/20 rounded-xl shadow-md transition-all"
            onClick={() => signIn("github")}
          >
            <GrGoogle className="h-5 w-5" /> Sign in with Google
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white border border-white/20 rounded-xl shadow-md transition-all"
            onClick={() => signIn("github")}
          >
            <Github className="h-5 w-5" /> Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
