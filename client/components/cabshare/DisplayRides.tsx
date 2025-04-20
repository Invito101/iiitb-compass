"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

type FormValues = {
	date: string;
};

export default function DisplayRides({
	cabShares,
}: {
	cabShares: Prisma.CabShareGetPayload<{ include: { user: true } }>[];
}) {
	const router = useRouter();
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
			{/* Top Bar */}
			<div className="w-full h-28 flex items-center justify-between px-8 shadow-md">
				<div className="flex items-center gap-4">
					<Image src="/spinner.png" alt="Logo" width={40} height={40} />
				</div>
				<div className="flex items-center gap-4">
					<ModeToggle />
					<Image
						src="/profile.jpg"
						alt="Account"
						width={48}
						height={48}
						className="rounded-full object-cover cursor-pointer border-2 border-black/10 dark:border-white"
					/>
				</div>
			</div>

			{/* Content */}
			<div className="p-8 flex-1 max-w-7xl mx-auto w-full">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-bold">Available CabShares</h1>
					<Button
						onClick={() => router.push("/cabshare/create")}
						className="bg-purple-600 hover:bg-purple-700 text-black font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10 dark:text-white"
					>
						Add CabShare
					</Button>
				</div>

				<Card className="mb-12 border border-black/10 dark:border-white/20 bg-transparent shadow-lg">
					<CardHeader>
						<CardTitle>
							CabShares on {formatDate(selectedDate)}
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
												<Input
													type="date"
													{...field}
													className="bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 max-w-xs"
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
									gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
								}}
							>
								{filtered.map((cab) => (
									<div
										key={cab.id}
										className="w-full h-36 p-6 border border-black/10 dark:border-white/20 rounded-xl bg-white dark:bg-black/30 shadow-md flex flex-col justify-between"
									>
										<div>
											<strong>Time:</strong>{" "}
											{cab.date.toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											})}
										</div>
										<div>
											<strong>Route:</strong>{" "}
											{cab.origin} to {cab.destination}
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
