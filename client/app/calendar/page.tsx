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

	if (status != "authenticated") {
		redirect("/auth");
	}

	return (
		<div className="h-full min-h-full ">
			<iframe
				src="https://calendar.google.com/calendar/embed?src=92734038c6cced005a2eda9a3c6350a548b06b1966f1e449c5759021253c1670%40group.calendar.google.com&ctz=Asia%2FKolkata"
				className="border-none w-full h-full"
				scrolling="no"
			></iframe>
		</div>
	);
}
