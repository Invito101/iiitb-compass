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
		<div className="min-h-screen flex flex-col">
			{/* Navigation Bar */}
			<Navbar></Navbar>

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
			
			{/* Footer with Copyright */}
			<footer className="mt-auto py-6 px-8 border-t border-gray-200 dark:border-gray-800">
				<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
					<div className="text-sm text-gray-500 dark:text-gray-400">
						&copy; {new Date().getFullYear()} IIITB Compass. All rights reserved.
					</div>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
							Contact Us
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}