"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import spinner from "./spinner.png"; // Import your spinner image

export default function Login() {
  const { data, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (status === "authenticated") {
    redirect("/");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Image
          src={spinner}
          alt="Loading"
          width={64}
          height={64}
          className="animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            className="w-full flex items-center gap-2"
            onClick={() => signIn("github")}
          >
            <Github className="h-5 w-5" /> Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
