"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { lostAndFoundWithUserType } from "@/types/prisma-types";
import LostPage from "./LostPage";
import FoundPage from "./FoundPage";
import { Navbar } from "../general/Navbar";

export default function LostAndFound({
	lostItems,
	foundItems,
}: {
	lostItems: lostAndFoundWithUserType[];
	foundItems: lostAndFoundWithUserType[];
}) {
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
							{activeTab === "lost" ? "lost item" : "found item"}
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
						<LostPage lostItems={lostItems} />
					</TabsContent>

					<TabsContent value="found">
						<FoundPage foundItems={foundItems} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
