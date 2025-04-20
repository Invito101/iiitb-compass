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
import { Navbar } from "../general/Navbar";

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

	return (
		<div className="min-h-screen flex flex-col overflow-auto">
			<Navbar></Navbar>

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