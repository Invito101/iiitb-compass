"use client";
import { lostAndFoundWithUserType } from "@/types/prisma-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Trash } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect } from "react";

export default function LostAndFoundComponent({
	items,
}: {
	items: lostAndFoundWithUserType[];
}) {
	const { data, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth");
		}
	}, [status, router]);

	const currentUserId = data?.user.id;

	const handleDelete = async (id: string) => {
		try {
			const res = await fetch("/api/lostfound/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});

			if (!res.ok) {
				const { error } = await res.json();
				alert("Failed to delete: " + error);
				return;
			}

			router.refresh();
		} catch (error) {
			console.error("Error deleting item:", error);
			alert("Error deleting item.");
		}
	};

	return (
		<div className="w-full px-2 py-6">
			{items.length === 0 ? (
				<p className="text-muted-foreground text-lg">
					No lost items yet. 🥲
				</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-0">
					{items.map((item) => (
						<Card
							key={item.id}
							className="border border-border rounded-lg bg-card shadow flex flex-col w-full h-full overflow-hidden"
						>
							{item.image ? (
								<Image
									src={item.image}
									alt={item.name}
									fill
									className="object-cover "
								/>
							) : (
								<div className="flex items-center -mt-6 justify-center h-40 w-full bg-gray-200 rounded-t-lg">
									<p className="text-gray-500">No image</p>
								</div>
							)}

							<CardContent className="-mt-4 flex-1 px-4">
								<h3 className="font-bold text-lg mb-1">
									{item.name}
								</h3>

								<div className="flex flex-row">
									<p className="text-sm mb-2 w-1/2">
										{item.type === "found"
											? "Found at "
											: "Last seen at "}
										<span className="font-bold">
											{item.location}
										</span>
									</p>

									{item.type === "found" &&
										item.currentLocation && (
											<p className="text-sm mb-2">
												Currently at{" "}
												<span className="font-bold">
													{item.currentLocation}
												</span>
											</p>
										)}
								</div>

								{item.description && (
									<p className="text-xs text-muted-foreground line-clamp-6 h-24 mb-2">
										{item.description}
									</p>
								)}
							</CardContent>
							<CardFooter className="flex -mt-4 px-4 flex-row md:flex-row items-center justify-between border-t border-border">
								<div className="flex flex-row gap-x-2 items-center justify-center">
									<Avatar className="h-8 w-8 cursor-pointer">
										<AvatarImage
											src={
												item.user.image ||
												"/profile.jpg"
											}
										/>
										<AvatarFallback>
											{item.user.name || "U"}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col gap-y-1">
										<p className="text-sm font-bold">
											{item.user.name}
										</p>

										<div className="flex flex-row gap-x-2">
											<p className="text-xs font-normal">
												{item.user.phone || "NA"}
											</p>
											<p className="text-xs text-muted-foreground">
												{format(
													item.date,
													"do MMM yyyy"
												)}
											</p>
										</div>
									</div>
								</div>

								{item.userId === currentUserId && (
									<Button
										className="bg-red-600 hover:bg-red-700 text-white p-0 w-8 h-8 flex items-center justify-center"
										size="sm"
										onClick={() => handleDelete(item.id)}
									>
										<Trash size={16} />
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
