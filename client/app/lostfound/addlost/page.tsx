"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createLostItem } from "@/forms/lost-and-found/action";
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
	lostFormSchema,
	LostFormSchema,
} from "@/forms/lost-and-found/lostAndFoundSchema";
import { Navbar } from "@/components/general/Navbar";

export default function AddLostItemPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const editIndex = searchParams.get("edit");

	const form = useForm<LostFormSchema>({
		resolver: zodResolver(lostFormSchema),
		defaultValues: {
			lostItem: "",
			location: "",
			date: new Date(),
			description: "",
		},
	});

	const onSubmit = async (data: LostFormSchema) => {
		await createLostItem(data);
		router.push("/lostfound");
	};

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground">
			<Navbar></Navbar>

			<div className="flex-1 container max-w-2xl mx-auto py-8">
				<div className="flex flex-row justify-between mb-6">
					<h1 className="text-3xl font-bold">Add Lost Item</h1>
				</div>
				<div className="bg-card p-6 rounded-lg shadow-md border border-border">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="lostItem"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Item Name</FormLabel>
										<FormControl>
											<Input
												placeholder="What did you lose?"
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
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Where did you last see it?"
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
										<FormLabel>Date Lost</FormLabel>
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
									className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
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
