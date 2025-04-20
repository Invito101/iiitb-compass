"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Login() {
	const { data, status } = useSession();

	const userName = data?.user?.name || "User";
	const userImage = data?.user?.image || "/profile.png";

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			{/* Navigation Bar */}
			<div className="h-28 flex items-center justify-between shadow-md border border-b px-8">
				<Link href={"/dashboard"} className="flex items-center gap-4">
					<Image
						src="/spinner.png"
						alt="Logo"
						width={40}
						height={40}
					/>
				</Link>
				<div className="relative">
					<div
						className="gap-x-4 items-center justify-center hidden md:flex md:flex-row relative"
						onMouseEnter={(e) => {
							const calendarLink = e.currentTarget.querySelector(
								'a[href="/calendar"]'
							) as HTMLElement;
							const underline = e.currentTarget.querySelector(
								".absolute"
							) as HTMLElement;
							if (calendarLink && underline) {
								underline.style.setProperty(
									"--underline-width",
									`${calendarLink.offsetWidth}px`
								);
								underline.style.setProperty(
									"--underline-left",
									`${calendarLink.offsetLeft}px`
								);
							}
						}}
					>
						<div
							className="absolute bottom-0 h-0.5 bg-purple-600 transition-all duration-300"
							style={{
								width: "var(--underline-width, 0)",
								left: "var(--underline-left, 0)",
							}}
						/>
						{[
							{
								href: "/dashboard",
								label: "Dashboard",
							},
							{
								href: "/calendar",
								label: "Calendar",
								className: "text-purple-600 font-semibold",
							},
							{ href: "/cabshare", label: "Cab Share" },
							{ href: "/lostfound", label: "L&F" },
							{ href: "/foodmenu", label: "Food Menu" },
						].map(({ href, label, className = "" }) => (
							<Link
								key={href}
								href={href}
								className={`group relative ${className} text-muted-foreground hover:text-purple-600 transition-colors duration-300`}
								onMouseEnter={(e) => {
									const target = e.currentTarget;
									const underline =
										target.parentElement?.querySelector(
											".absolute"
										) as HTMLElement;
									if (underline) {
										underline.style.setProperty(
											"--underline-width",
											`${target.offsetWidth}px`
										);
										underline.style.setProperty(
											"--underline-left",
											`${target.offsetLeft}px`
										);
									}
								}}
								onMouseLeave={(e) => {
									const underline =
										e.currentTarget.parentElement?.querySelector(
											".absolute"
										) as HTMLElement;
									if (underline) {
										underline.style.setProperty(
											"--underline-width",
											"0"
										);
									}
								}}
							>
								<span>{label}</span>
							</Link>
						))}
					</div>
				</div>

				<div className="flex items-center gap-4">
					<ModeToggle />
					<Link href="/profile" className="h-8 w-8">
						<Avatar>
							<AvatarImage src={userImage} />
							<AvatarFallback>{userName}</AvatarFallback>
						</Avatar>
					</Link>
				</div>
			</div>

			{/* Fullscreen Calendar */}
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
