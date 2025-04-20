"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { foodMenuCycleWithEntriesWithItemAndRatingType } from "@/types/prisma-types";

type MenuItem = {
	id: string;
	name: string;
	type: "veg" | "nonveg" | "egg";
};

type MenuCategory = {
	title: string;
	items: MenuItem[];
};

const weeklyMenu: Record<string, MenuCategory[]> = {
	Monday: [
		{
			title: "Breakfast",
			items: [
				{ id: "pancakes", name: "Pancakes", type: "veg" },
				{ id: "omelette", name: "Omelette", type: "egg" },
				{ id: "potato", name: "potato", type: "veg" },
			],
		},
		{
			title: "Lunch",
			items: [
				{
					id: "grilled-chicken",
					name: "Grilled Chicken",
					type: "nonveg",
				},
				{ id: "veggie-burger", name: "Veggie Burger", type: "veg" },
			],
		},
		{
			title: "Snacks",
			items: [
				{ id: "fries", name: "French Fries", type: "veg" },
				{ id: "nachos", name: "Nachos", type: "veg" },
			],
		},
		{
			title: "Dinner",
			items: [
				{ id: "steak", name: "Steak", type: "nonveg" },
				{ id: "salmon", name: "Salmon", type: "nonveg" },
			],
		},
	],
	// Fallback for other days; clone Monday menu
	default: [] as MenuCategory[],
};
weeklyMenu.default = weeklyMenu.Monday;

const Section: React.FC<MenuCategory> = ({ title, items }) => (
	<div className="mb-8">
		<h2 className="text-2xl font-semibold mb-4">{title}</h2>
		<Card>
			<CardContent className="p-0">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
					>
						<div className="flex items-center">
							{item.type === "veg" && (
								<span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
							)}
							{item.type === "egg" && (
								<span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
							)}
							{item.type === "nonveg" && (
								<span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
							)}
							<span className="text-lg">{item.name}</span>
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								aria-label="Upvote"
							>
								<ThumbsUp />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Downvote"
							>
								<ThumbsDown />
							</Button>
							<Link href={`/review/${item.id}`}>
								<Button
									variant="ghost"
									size="icon"
									aria-label="Comment"
								>
									<MessageSquare />
								</Button>
							</Link>
						</div>
					</div>
				))}
				{items.length === 0 && (
					<div className="px-4 py-3 text-sm text-muted-foreground">
						No items available.
					</div>
				)}
			</CardContent>
		</Card>
	</div>
);

export default function DisplayFoodMenu({
	foodMenu,
}: {
	foodMenu: foodMenuCycleWithEntriesWithItemAndRatingType;
}) {
	const todayISO = new Date().toISOString().split("T")[0];
	const [selectedDate, setSelectedDate] = useState<string>(todayISO);

	const dayName = new Date(selectedDate).toLocaleDateString("en-US", {
		weekday: "long",
	});
	const menuToShow = weeklyMenu[dayName] || weeklyMenu.default;

	const user = useSession();
	const userName = user?.data?.user?.name || "User";
	const userImage = user?.data?.user?.image || "/profile.jpg";

	return (
		<div className="min-h-screen bg-background">
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
							const foodMenuLink = e.currentTarget.querySelector(
								'a[href="/foodmenu"]'
							) as HTMLElement;
							const underline = e.currentTarget.querySelector(
								".absolute"
							) as HTMLElement;
							if (foodMenuLink && underline) {
								underline.style.setProperty(
									"--underline-width",
									`${foodMenuLink.offsetWidth}px`
								);
								underline.style.setProperty(
									"--underline-left",
									`${foodMenuLink.offsetLeft}px`
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
							{ href: "/calendar", label: "Calendar" },
							{ href: "/cabshare", label: "Cab Share" },
							{ href: "/lostfound", label: "L&F" },
							{
								href: "/foodmenu",
								label: "Food Menu",
								className: "text-purple-600 font-semibold",
							},
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
			<main className="max-w-4xl mx-auto p-6 space-y-6">
				<div className="flex items-center gap-4">
					<Label htmlFor="date" className="text-sm font-medium">
						Select Date:
					</Label>
					<Input
						id="date"
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
					/>
				</div>

				{menuToShow.map((section) => (
					<Section
						key={section.title}
						title={section.title}
						items={section.items}
					/>
				))}
			</main>
		</div>
	);
}
