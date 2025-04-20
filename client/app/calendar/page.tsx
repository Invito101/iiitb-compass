"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/general/Navbar";
import { useRouter } from "next/navigation";

export default function Login() {
	const { data, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === "unauthenticated") {
		  router.push("/auth");
		}
	  }, [status, router]);
	const userName = data?.user?.name || "User";
	const userImage = data?.user?.image || "/profile.png";

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<Navbar></Navbar>

			<div className="flex-1 min-h-0">
				<iframe
					src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showPrint=0&showTz=0&src=OTI3MzQwMzhjNmNjZWQwMDVhMmVkYTlhM2M2MzUwYTU0OGIwNmIxOTY2ZjFlNDQ5YzU3NTkwMjEyNTNjMTY3MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E"
					className="border-none w-full h-full"
					scrolling="no"
				></iframe>
			</div>
		</div>
	);
}
