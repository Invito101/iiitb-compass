"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { lostAndFoundWithUserType } from "@/types/prisma-types";
import LostAndFoundComponent from "./LostAndFoundComponent";
import { Navbar } from "../general/Navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LostAndFound({
	lostItems,
	foundItems,
}: {
	lostItems: lostAndFoundWithUserType[];
	foundItems: lostAndFoundWithUserType[];
}) {
	const router = useRouter();
	const { data, status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth");
		}
	}, [status, router]);

	const [activeTab, setActiveTab] = React.useState<"lost" | "found">("lost");

	const handleTabChange = (value: string) => {
		setActiveTab(value as "lost" | "found");
	};

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
			<Navbar />

			<div className="flex-1 p-8 max-w-7xl mx-auto w-full">
				<div className="flex flex-row justify-between mb-6">
					<h1 className="text-3xl font-bold">Lost and Found</h1>
					<Link
						href={
							activeTab === "lost"
								? "/lostfound/addlost"
								: "/lostfound/addfound"
						}
					>
						<Button className="bg-purple-600 hover:bg-purple-700 text-white">
							+ Add{" "}
							{activeTab === "lost" ? "Lost Item" : "Found Item"}
						</Button>
					</Link>
				</div>

				<Tabs
					defaultValue="lost"
					className="w-full"
					onValueChange={handleTabChange}
				>
					<TabsList>
						<TabsTrigger value="lost">Lost Items</TabsTrigger>
						<TabsTrigger value="found">Found Items</TabsTrigger>
					</TabsList>

					<TabsContent value="lost">
						<LostAndFoundComponent items={lostItems} />
					</TabsContent>

					<TabsContent value="found">
						<LostAndFoundComponent items={foundItems} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
