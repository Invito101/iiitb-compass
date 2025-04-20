"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { foodMenuCycleWithEntriesWithItemAndRatingType } from "@/types/prisma-types";
import { format, parseISO } from "date-fns";
import { Navbar } from "../general/Navbar";

const DAY_NAMES = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
] as const;

type DayName = (typeof DAY_NAMES)[number];

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

	const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

	return (
		<div className="min-h-screen bg-background">
			<Navbar></Navbar>

			<div className="max-w-4xl mx-auto p-6 space-y-4">
				{/* Day selector */}
				<div className="flex flex-col items-center space-y-2">
					<div className="flex items-center space-x-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setDayIdx((d) => (d + 6) % 7)}
						>
							<ChevronLeft />
						</Button>
						<h2 className="text-xl font-semibold w-48 text-center">
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
					<div className="text-sm text-muted-foreground">
						{startLabel} to {endLabel}
					</div>
				</div>
				<Separator />

				{/* Meals */}
				{Object.entries(meals).map(([meal, entries]) => (
					<div key={meal} className="mb-8">
						<h3 className="text-2xl font-semibold mb-4">{meal}</h3>
						<Card>
							<CardContent className="p-0">
								{entries.length ? (
									entries.map((entry) => {
										const ratings = entry.FoodItemRating;
										const avg =
											ratings.length > 0
												? ratings.reduce(
														(sum, r) =>
															sum + r.rating,
														0
												  ) / ratings.length
												: null;
										return (
											<div
												key={entry.id}
												className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
											>
												<div className="flex flex-col">
													<div className="flex items-center space-x-2">
														<span className="text-lg font-medium">
															{
																entry.foodItem
																	.name
															}
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
												</div>
												<div className="flex items-center gap-2">
													{avg !== null &&
														(isMobile ? (
															<span className="text-sm text-yellow-600 font-medium">
																{avg.toFixed(1)}
																/5
															</span>
														) : (
															<div className="flex items-center gap-0.5 text-yellow-500">
																{Array.from({
																	length: 5,
																}).map(
																	(_, i) => (
																		<Star
																			key={
																				i
																			}
																			className={`w-4 h-4 ${
																				i <
																				Math.round(
																					avg
																				)
																					? "fill-yellow-500"
																					: "fill-muted stroke-yellow-500"
																			}`}
																		/>
																	)
																)}
															</div>
														))}
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
										);
									})
								) : (
									<div className="px-4 py-3 text-sm text-muted-foreground">
										No items available.
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}
