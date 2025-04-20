"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Prisma } from "@prisma/client";
import { DatePicker } from "@/components/ui/date-picker";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

type FormValues = {
	date: string;
};

export default function DisplayRides({
	cabShares,
}: {
	cabShares: Prisma.CabShareGetPayload<{ include: { user: true } }>[];
}) {
	const router = useRouter();
	const { data } = useSession();
	const userName = data?.user?.name || "User";
	const userImage = data?.user?.image || "/profile.png";

	const today = new Date().toISOString().split("T")[0];

	const form = useForm<FormValues>({
		defaultValues: { date: today },
	});
	const selectedDate = form.watch("date");

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	const startOfSelectedDate = new Date(selectedDate);
	startOfSelectedDate.setHours(0, 0, 0, 0);

	const endOfSelectedDate = new Date(selectedDate);
	endOfSelectedDate.setHours(23, 59, 59, 999);

	const filtered = cabShares.filter((cab) => {
		const cabDate = cab.date;
		return cabDate >= startOfSelectedDate && cabDate <= endOfSelectedDate;
	});

	const formatDate = (d: string) => {
		const [y, m, day] = d.split("-");
		return `${day}/${m}/${y}`;
	};

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
		<div className="min-h-screen flex flex-col overflow-auto">
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
							const cabShareLink = e.currentTarget.querySelector(
								'a[href="/cabshare"]'
							) as HTMLElement;
							const underline = e.currentTarget.querySelector(
								".absolute"
							) as HTMLElement;
							if (cabShareLink && underline) {
								underline.style.setProperty(
									"--underline-width",
									`${cabShareLink.offsetWidth}px`
								);
								underline.style.setProperty(
									"--underline-left",
									`${cabShareLink.offsetLeft}px`
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
							{
								href: "/cabshare",
								label: "Cab Share",
								className: "text-purple-600 font-semibold",
							},
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

			<div className="p-8 flex-1 max-w-7xl mx-auto w-full">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-bold">Available Cab Shares</h1>
					<Button
						onClick={() => router.push("/cabshare/create")}
						className="bg-purple-600 hover:bg-purple-700 font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10 text-white"
					>
						Add Cab Share
					</Button>
				</div>

				<Card className="mb-12 border border-black/10 dark:border-white/20 bg-transparent shadow-lg">
					<CardHeader>
						<CardTitle>
							Cab Shares on {formatDate(selectedDate)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{/* Date Selector */}
						<Form {...form}>
							<form className="mb-6">
								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												{/* Use Controller to wrap DatePicker */}
												<Controller
													name="date"
													control={form.control}
													render={({ field }) => (
														<DatePicker
															value={
																field.value ||
																""
															} // Fallback to empty string
															onChange={(
																date: string
															) =>
																field.onChange(
																	date
																)
															} // Ensure onChange works with string
														/>
													)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>

						{filtered.length === 0 ? (
							<p>No cabshares found.</p>
						) : (
							<div
								className="grid gap-6 justify-center"
								style={{
									gridTemplateColumns:
										"repeat(auto-fit, minmax(360px, 1fr))",
								}}
							>
								{filtered.map((cab) => (
									<div
										key={cab.id}
										className="w-full h-36 p-6 border border-black/10 dark:border-white/20 rounded-xl bg-white dark:bg-black/30 shadow-md flex flex-col justify-between"
									>
										<div>
											<strong>Route:</strong> {cab.origin}{" "}
											to {cab.destination}
										</div>
										<div>
											<strong>Time:</strong>{" "}
											{cab.date.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											})}
										</div>
										<div>
											<strong>Contact:</strong>{" "}
											{cab.user.phone || "N/A"}
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
