"use client";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ModeToggle } from "@/components/mode-toggle";
import {
	cabSharingFormSchema,
	CabSharingFormSchema,
} from "@/forms/cab-sharing/cabSharingSchema";
import { useSession } from "next-auth/react";
import { createCabSharing } from "@/forms/cab-sharing/action";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/general/Navbar";

export default function AddCabSharePage() {
	const { data, status } = useSession();
	const userName = data?.user?.name || "User";
	const userImage = data?.user?.image || "/profile.png";
	const router = useRouter();
	const form = useForm<CabSharingFormSchema>({
		resolver: zodResolver(cabSharingFormSchema),
		defaultValues: {
			origin: "",
			destination: "",
			date: new Date(),
		},
	});
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth");
		}
	}, [status, router]);


	const onSubmit = async (values: CabSharingFormSchema) => {
		const response = await createCabSharing(values);
		console.log(response);
		router.push("/cabshare");
	};

	return (
		<div className="min-h-screen flex flex-col overflow-auto">
			<Navbar></Navbar>

			<div className="p-8 flex-1">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Add Cab Share
				</h1>

				<Card className="max-w-xl mx-auto bg-transparent p-6 rounded-xl shadow-lg border border-black/10 dark:border-white/20">
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4 flex flex-col"
							>
								<FormField
									control={form.control}
									name="origin"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Origin</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter origin"
													required
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="destination"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Destination</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Enter destination"
													required
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date & Time</FormLabel>
											<FormControl>
												<DateTimePicker
													date={field.value}
													setDate={field.onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex justify-between mt-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => router.push("/cabshare")}
										className="border border-black/10 dark:border-white/10"
									>
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10"
									>
										Add CabShare
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
