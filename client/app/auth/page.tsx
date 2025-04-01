"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
	const { data, status } = useSession();
	if (status === "authenticated") {
		redirect("/");
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
