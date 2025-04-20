"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { foodMenuEntryWithItemAndRatingType } from "@/types/prisma-types";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
	FoodItemSchema,
	foodItemSchema,
} from "@/forms/food-menu/food-item/foodItemSchema";
import { rateFoodItem } from "@/forms/food-menu/food-item/action";
import { useRouter } from "next/navigation";

export default function DisplayFoodItem({
	foodEntry,
}: {
	foodEntry: foodMenuEntryWithItemAndRatingType;
}) {
	const [hoveredRating, setHoveredRating] = useState(0);
	const session = useSession();
	const userName = session?.data?.user?.name || "User";
	const userImage = session?.data?.user?.image || "/profile.jpg";

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FoodItemSchema>({
		resolver: zodResolver(foodItemSchema),
		defaultValues: {
			rating: 0,
			comment: "",
			imageUrl: "",
			foodEntryId: foodEntry.id,
		},
	});

	const rating = watch("rating");
	const router = useRouter();
	const onSubmit = async (data: FoodItemSchema) => {
		console.log("Submitted Review", {
			foodMenuEntryId: foodEntry.id,
			...data,
		});
		await rateFoodItem({ data });
		reset();
		setHoveredRating(0);
		router.push("/foodmenu");
	};

	return (
		<div className="min-h-screen flex flex-col bg-background">
			{/* Navigation Bar */}
			<div className="h-28 flex items-center justify-between shadow-md border border-b px-8 w-full">
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

			{/* Content Section */}
			<div className="flex flex-col justify-center items-center py-8 flex-grow px-8 -mt-15">
				<Card className="w-full max-w-xl p-6 rounded-2xl shadow-lg">
					<CardContent>
						<div className="text-center mb-6">
							<h1 className="text-3xl font-medium mb-1">
								How was{" "}
								<span className="font-bold">
									{foodEntry.foodItem.name}
								</span>
								?
							</h1>
							<p className="text-muted-foreground">
								Leave a review!
							</p>
						</div>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* Star Rating */}
							<div className="flex justify-center items-center space-x-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={cn(
											"h-8 w-8 cursor-pointer transition-colors",
											(hoveredRating || rating) >= star
												? "text-yellow-500"
												: "text-gray-300"
										)}
										onClick={() => setValue("rating", star)}
										onMouseEnter={() =>
											setHoveredRating(star)
										}
										onMouseLeave={() => setHoveredRating(0)}
										strokeWidth={1.5}
										fill={
											(hoveredRating || rating) >= star
												? "#facc15"
												: "none"
										}
									/>
								))}
							</div>
							{errors.rating && (
								<p className="text-sm text-red-500 text-center">
									{errors.rating.message}
								</p>
							)}

							{/* Comment */}
							<div>
								<Label htmlFor="comment">
									Comment{" "}
									<span className="text-muted-foreground text-sm">
										(optional)
									</span>
								</Label>
								<Textarea
									id="comment"
									placeholder="Write your thoughts..."
									{...register("comment")}
									className="min-h-[100px] mt-2"
								/>
							</div>

							{/* Buttons */}
							<div className="flex justify-between items-center pt-2">
								<Link href="/foodmenu">
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</Link>

								<Button
									type="submit"
									className="bg-purple-600 hover:bg-purple-700 font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10 text-white"
								>
									Submit Review
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
