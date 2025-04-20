"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { foodMenuCycleWithEntriesWithItemAndRatingType } from "@/types/prisma-types";
import { format, parseISO } from "date-fns";

type DayName =
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";
const DAY_NAMES: DayName[] = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export default function DisplayFoodMenu({
	foodMenu,
}: {
	foodMenu: foodMenuCycleWithEntriesWithItemAndRatingType;
}) {
	const session = useSession();
	const userName = session?.data?.user?.name || "User";
	const userImage = session?.data?.user?.image || "/profile.jpg";

	const today = new Date();
	const todayIdx = today.getDay();
	const [dayIdx, setDayIdx] = useState<number>(todayIdx);

	const start = parseISO(foodMenu.startDate.toISOString());
	const end = parseISO(foodMenu.endDate.toISOString());
	const startLabel = format(start, "MMM d, yyyy");
	const endLabel = format(end, "MMM d, yyyy");

	const entriesForDay = foodMenu.FoodMenuEntries.filter(
		(e) => e.dayOfWeek.toLowerCase() === DAY_NAMES[dayIdx].toLowerCase()
	);
	const meals: Record<string, typeof entriesForDay> = {
		Breakfast: [],
		Lunch: [],
		Snacks: [],
		Dinner: [],
	};
	entriesForDay.forEach((entry) => {
		const type =
			entry.mealType.charAt(0).toUpperCase() +
			entry.mealType.slice(1).toLowerCase();
		if (meals[type]) meals[type].push(entry);
	});

	const getBadgeBg = (dt: string) => {
		switch (dt.toLowerCase()) {
			case "veg":
				return "bg-green-900";
			case "non-veg":
			case "nonveg":
				return "bg-red-900";
			case "egg":
				return "bg-yellow-600";
			case "vegan":
				return "bg-green-300";
			case "jain":
				return "bg-blue-900";
			default:
				return "bg-gray-100";
		}
	};
	const getBadgeText = (dt: string) => {
		switch (dt.toLowerCase()) {
			case "veg":
				return "text-green-200";
			case "non-veg":
			case "nonveg":
				return "text-red-200";
			case "egg":
				return "text-yellow-100";
			case "vegan":
				return "text-green-900";
			case "jain":
				return "text-blue-200";
			default:
				return "text-gray-800";
		}
	};

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

			{/* Navigation & period info */}
			<div className="max-w-4xl mx-auto p-6 space-y-4">
				<div className="flex flex-col items-center space-y-2">
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setDayIdx((d) => (d + 6) % 7)}
						>
							<ChevronLeft />
						</Button>
						<h2 className="text-xl font-semibold">
							{DAY_NAMES[dayIdx]}'s Menu
						</h2>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setDayIdx((d) => (d + 1) % 7)}
						>
							<ChevronRight />
						</Button>
					</div>
					<div className="text-sm font-medium text-muted-foreground">
						{startLabel} to {endLabel}
					</div>
				</div>
				<Separator />

				{/* Meals */}
				{(["Breakfast", "Lunch", "Snacks", "Dinner"] as const).map(
					(meal) => (
						<div key={meal} className="mb-8">
							<h3 className="text-2xl font-semibold mb-4">
								{meal}
							</h3>
							<Card>
								<CardContent className="p-0">
									{meals[meal].length ? (
										meals[meal].map((entry) => (
											<div
												key={entry.id}
												className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
											>
												<div className="flex items-center space-x-2">
													<span className="text-lg font-medium">
														{entry.foodItem.name}
													</span>
													{entry.foodItem.dietType.map(
														(dt) => (
															<Badge
																key={dt}
																className={`${getBadgeBg(
																	dt
																)} ${getBadgeText(
																	dt
																)}`}
															>
																{dt}
															</Badge>
														)
													)}
												</div>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														asChild
													>
														<Link
															href={`/foodmenu/${entry.id}`}
														>
															Rate
														</Link>
													</Button>
													<Button
														asChild
														variant="ghost"
														size="icon"
													>
														<Link
															href={`/foodmenu/comments/${entry.id}`}
														>
															<MessageSquare />
														</Link>
													</Button>
												</div>
											</div>
										))
									) : (
										<div className="px-4 py-3 text-sm text-muted-foreground">
											No items available.
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					)
				)}
			</div>
		</div>
	);
}
