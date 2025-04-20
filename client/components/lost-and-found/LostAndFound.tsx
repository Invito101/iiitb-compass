"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";
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
	const pathname = usePathname();
	const [activeTab, setActiveTab] = React.useState<"lost" | "found">("lost");

	const handleTabChange = (value: string) => {
		setActiveTab(value as "lost" | "found");
	};

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
			<Navbar></Navbar>

			{/* Main Content */}
			<div className="w-full flex flex-col px-8 py-2 border-b border-border bg-background z-10 flex-1 overflow-hidden">
				<Tabs
					defaultValue="lost"
					className="w-full"
					onValueChange={handleTabChange}
				>
					<div className="flex items-center justify-between w-full">
						<TabsList className="bg-transparent border-none shadow-none p-0 gap-2">
							<TabsTrigger
								value="lost"
								className="px-4 py-2 rounded-md outline-none ring-0 focus:outline-none focus-visible:outline-none
                data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 
                data-[state=active]:text-white transition"
							>
								Lost
							</TabsTrigger>
							<TabsTrigger
								value="found"
								className="px-4 py-2 rounded-md outline-none ring-0 focus:outline-none focus-visible:outline-none
                data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-fuchsia-600 
                data-[state=active]:text-white transition"
							>
								Found
							</TabsTrigger>
						</TabsList>

						<Link
							href={
								activeTab === "lost"
									? "/lostfound/addlost"
									: "/lostfound/addfound"
							}
						>
							<Button className="ml-4 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white">
								+ Add{" "}
								{activeTab === "lost"
									? "lost item"
									: "found item"}
							</Button>
						</Link>
					</div>

					{/* Lost Tab */}
					<TabsContent value="lost">
						<LostPage lostItems={lostItems} />
					</TabsContent>

					{/* Found Tab */}
					<TabsContent value="found">
						<FoundPage foundItems={foundItems} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
