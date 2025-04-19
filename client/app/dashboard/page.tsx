"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="h-28 flex items-center justify-between shadow-md px-6">
				<div className="flex items-center gap-4">
					<Image
						src="/spinner.png"
						alt="Logo"
						width={40}
						height={40}
					/>
				</div>

				<div className="flex items-center gap-4">
					<ModeToggle />
					<Image
						src="/profile.jpg"
						alt="Account"
						width={48}
						height={48}
						className="rounded-full object-cover cursor-pointer border-2 border-white"
					/>
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
					}
					else if( i === 3) {
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
