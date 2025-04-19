"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ItemEntry {
  type: "lost" | "found";
  itemName: string;
  place: string;
  currentLocation: string;
  contact: string;
  image: string;
  date?: Date;
  description?: string;
}

export default function LostAndFoundPage() {
  const [items, setItems] = useState<ItemEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost");
  const pathname = usePathname();

  const handleTabChange = (value: string) => {
    setActiveTab(value as "lost" | "found");
  };

  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const renderItemCard = (item: ItemEntry, index: number) => (
    <div
      key={index}
      className="border border-border rounded-md p-4 flex gap-4 items-start bg-card shadow"
    >
      <div className="flex flex-col gap-1 flex-1">
        {item.image && (
          <Image
            src={item.image}
            alt={item.itemName}
            width={100}
            height={100}
            className="rounded object-cover"
          />
        )}
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg">{item.itemName}</p>
          {item.date && (
            <p className="text-sm">📅 Date: {item.date.toLocaleDateString()}</p>
          )}
          {item.type === "lost" ? (
            <p className="text-sm">📍 Lost at: {item.place}</p>
          ) : (
            <>
              <p className="text-sm">📍 Found at: {item.place}</p>
              <p className="text-sm">📦 Currently At: {item.currentLocation}</p>
            </>
          )}
          {item.description && (
            <p className="text-sm">📝 Description: {item.description}</p>
          )}
          <p className="text-sm">📞 Contact: {item.contact}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-auto">
        <Link href={item.type === "lost" ? `/addlost?edit=${index}` : `/addfound?edit=${index}`}>
          <Button
            variant="outline"
            className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
          >
            Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          className="bg-gradient-to-br from-red-600 to-pink-600 text-white"
          onClick={() => handleDelete(index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
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
            className="rounded-full object-cover border-2 border-white"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col px-8 py-2 border-b border-border bg-background z-10 flex-1 overflow-hidden">
        <Tabs defaultValue="lost" className="w-full" onValueChange={handleTabChange}>
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

            <Link href={activeTab === "lost" ? "/lostfound/addlost" : "/lostfound/addfound"}>
            <Button
                className="ml-4 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
              >
                + Add {activeTab === "lost" ? "lost item" : "found item"}
              </Button>
            </Link>
          </div>

          {/* Lost Tab */}
          <TabsContent value="lost">
            <div className="flex flex-col gap-4 px-4 py-6 overflow-y-auto">
              {items.filter((item) => item.type === "lost").length > 0 ? (
                items.filter((item) => item.type === "lost").map(renderItemCard)
              ) : (
                <p className="text-muted-foreground text-sm">No lost items yet. 😭</p>
              )}
            </div>
          </TabsContent>

          {/* Found Tab */}
          <TabsContent value="found">
            <div className="flex flex-col gap-4 px-4 py-6 overflow-y-auto">
              {items.filter((item) => item.type === "found").length > 0 ? (
                items.filter((item) => item.type === "found").map(renderItemCard)
              ) : (
                <p className="text-muted-foreground text-sm">No found items yet. 😈</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}