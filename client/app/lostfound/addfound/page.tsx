"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFoundItem } from "@/forms/lost-and-found/action";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ModeToggle } from "@/components/mode-toggle";
import {
	foundFormSchema,
	FoundFormSchema,
} from "@/forms/lost-and-found/lostAndFoundSchema";
import { Navbar } from "@/components/general/Navbar";

export default function AddFoundItemPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data, status } = useSession();
	const editIndex = searchParams.get("edit");

	const form = useForm<FoundFormSchema>({
		resolver: zodResolver(foundFormSchema),
		defaultValues: {
			foundItem: "",
			location: "",
			currentLocation: "",
			date: new Date(),
			description: "",
		},
	});

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth");
		}
	}, [status, router]);

	const onSubmit = async (data: FoundFormSchema) => {
		// Here you would typically send this data to your backend
		// or store it in a global state management solution
		console.log("Found item form submitted:", data);

		await createFoundItem(data);
		// For now, just navigate back to the main page
		router.push("/lostfound");
	};

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground">
			<Navbar />

			<div className="flex-1 container max-w-2xl mx-auto py-8">
				<div className="flex flex-row justify-between mb-6">
					<h1 className="text-3xl font-bold">Add Found Item</h1>
				</div>
				<div className="bg-card p-6 rounded-lg shadow-md border border-border">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="foundItem"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Item Name</FormLabel>
										<FormControl>
											<Input
												placeholder="What did you find?"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location Found</FormLabel>
										<FormControl>
											<Input
												placeholder="Where did you find it?"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="currentLocation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Where is the item now?"
												{...field}
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
									<FormItem className="flex flex-col">
										<FormLabel>Date Found</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className="w-full pl-3 text-left font-normal flex justify-between items-center"
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() ||
														date <
															new Date(
																"1900-01-01"
															)
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Describe the item (color, brand, distinguishing features)"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-between pt-4">
								<Link href="/lostfound">
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</Link>
								<Button
									type="submit"
									className="bg-purple-600 hover:bg-purple-700 text-white"
								>
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
