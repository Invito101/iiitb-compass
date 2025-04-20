"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useSession();
	const userName = user?.data?.user?.name || "User";
	const userImage = user?.data?.user?.image || "/profile.jpg";
	return (
		<div className="min-h-screen flex flex-col">
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
							const dashboardLink = e.currentTarget.querySelector(
								'a[href="/dashboard"]'
							) as HTMLElement;
							const underline = e.currentTarget.querySelector(
								".absolute"
							) as HTMLElement;
							if (dashboardLink && underline) {
								underline.style.setProperty(
									"--underline-width",
									`${dashboardLink.offsetWidth}px`
								);
								underline.style.setProperty(
									"--underline-left",
									`${dashboardLink.offsetLeft}px`
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
								className: "text-purple-600 font-semibold",
							},
							{ href: "/calendar", label: "Calendar" },
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

			<div className="flex-1 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{[...Array(8)].map((_, i) => {
					let href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // default chaos
					let label = "Surprise!";
					let imageSrc = "/mindcraft.jpg.avif";

					if (i === 0) {
						href = "/calendar";
						label = "Calendar";
						imageSrc = "/calendar.jpg";
					} else if (i === 1) {
						href = "/cabshare";
						label = "Cab Share";
						imageSrc = "/cab.jpg";
					} else if (i === 2) {
						href = "/lostfound";
						label = "Lost & Found";
						imageSrc = "/lostfound.jpg";
					} else if (i === 3) {
						href = "/foodmenu";
						label = "Food Menu";
						imageSrc = "/food.png";
					}

					return (
						<Link
							key={i}
							href={href}
							target={
								href.startsWith("http") ? "_blank" : undefined
							}
						>
							<div className="relative group aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-white/20 shadow-lg">
								<Image
									src={imageSrc}
									alt={`${label} Button`}
									fill
									className="object-cover group-hover:scale-110 transition-all duration-300"
								/>
								<div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
									{label}
								</div>
							</div>
						</Link>
					);
				})}
			</div>

			{children}
		</div>
	);
}
