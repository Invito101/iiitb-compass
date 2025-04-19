"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { ModeToggle } from "@/components/mode-toggle";

const routes = [
	{ label: "IIITB → Airport", value: "iiitb->airport" },
	{ label: "Airport → IIITB", value: "airport->iiitb" },
];

export default function AddCabSharePage() {
	const router = useRouter();
	const [routeOpen, setRouteOpen] = useState(false);
	const [newCabShare, setNewCabShare] = useState({
		date: "",
		time: "",
		route: "iiitb->airport",
		contact: "",
	});

	// fake 500ms spinner not needed here since no loading state…

	const addCabShare = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!/^\d{10}$/.test(newCabShare.contact)) {
			alert("Contact must be 10 digits.");
			return;
		}
		const existing = JSON.parse(localStorage.getItem("cabshares") || "[]");
		const newEntry = { id: Date.now(), ...newCabShare };
		localStorage.setItem(
			"cabshares",
			JSON.stringify([...existing, newEntry])
		);
		router.push("/cabshare");
	};

	return (
		<div className="min-h-screen flex flex-col overflow-auto">
			{/* Top Bar */}
			<div className="w-full h-28 flex items-center justify-between px-8 shadow-md">
				<div className="flex items-center gap-4">
					<Image
						src="/spinner.png"
						alt="Logo"
						width={40}
						height={40}
					/>
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
			<div className="p-8 flex-1">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Add CabShare
				</h1>

				<Card className="max-w-xl mx-auto bg-transparent p-6 rounded-xl shadow-lg border border-black/10 dark:border-white/20">
					<CardHeader>
						<CardTitle>New CabShare</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={addCabShare}
							className="space-y-4 flex flex-col"
						>
							<div>
								<Label htmlFor="date">Date</Label>
								<Input
									id="date"
									type="date"
									value={newCabShare.date}
									onChange={(e) =>
										setNewCabShare({
											...newCabShare,
											date: e.target.value,
										})
									}
									required
									className="bg-white dark:bg-black/20 border border-black/10 dark:border-white/10"
								/>
							</div>

							<div>
								<Label htmlFor="time">Time</Label>
								<Input
									id="time"
									type="time"
									value={newCabShare.time}
									onChange={(e) =>
										setNewCabShare({
											...newCabShare,
											time: e.target.value,
										})
									}
									required
									className="bg-white dark:bg-black/20 border border-black/10 dark:border-white/10"
								/>
							</div>

							<div>
								<Label>Route</Label>
								<Popover
									open={routeOpen}
									onOpenChange={setRouteOpen}
								>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className="w-full justify-start bg-white dark:bg-black/30 border border-black/10 dark:border-white/20"
										>
											{
												routes.find(
													(r) =>
														r.value ===
														newCabShare.route
												)!.label
											}
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-full p-0 bg-white dark:bg-black/90">
										<Command className="bg-transparent">
											<CommandList>
												{routes.map((r) => (
													<CommandItem
														key={r.value}
														className="hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
														onSelect={() => {
															setNewCabShare({
																...newCabShare,
																route: r.value,
															});
															setRouteOpen(false);
														}}
													>
														{r.label}
													</CommandItem>
												))}
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							</div>

							<div>
								<Label htmlFor="contact">Contact Number</Label>
								<Input
									id="contact"
									type="text"
									pattern="\d{10}"
									maxLength={10}
									value={newCabShare.contact}
									onChange={(e) =>
										setNewCabShare({
											...newCabShare,
											contact: e.target.value,
										})
									}
									required
									className="bg-white dark:bg-black/20 border border-black/10 dark:border-white/10"
								/>
							</div>

							<div className="flex justify-center">
								<Button
									type="submit"
									className="bg-purple-600 hover:bg-purple-700 font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border border-black/10 dark:border-white/10"
								>
									Add CabShare
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
