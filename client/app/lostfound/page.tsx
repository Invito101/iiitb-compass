"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ItemEntry {
  type: "lost" | "found";
  itemName: string;
  place: string;
  currentLocation: string;
  contact: string;
  image: string;
}

export default function LostAndFoundPage() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState<ItemEntry[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue
  } = useForm<ItemEntry>({
    defaultValues: {
      type: "lost",
      itemName: "",
      place: "",
      currentLocation: "",
      contact: "",
      image: "",
    },
  });

  const selectedType = watch("type");

  const toggleForm = () => {
    setShowForm(!showForm);
    reset();
  };

  const onSubmit = (data: ItemEntry) => {
    if (!data.itemName) return;

    const exists = items.some((item) => item.itemName === data.itemName);

    if (data.type === "lost" && exists) {
      setItems((prev) =>
        prev.map((item) =>
          item.itemName === data.itemName ? data : item
        )
      );
    } else {
      setItems((prev) => [data, ...prev]);
    }

    reset();
    setShowForm(false);
  };

  const handleEdit = (item: ItemEntry) => {
    Object.entries(item).forEach(([key, value]) =>
      setValue(key as keyof ItemEntry, value)
    );
    setItems((prev) =>
      prev.filter((i) => i.itemName !== item.itemName)
    );
    setShowForm(true);
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
          {item.type === "lost" ? (
            <p className="text-sm">📍 Lost at: {item.place}</p>
          ) : (
            <>
              <p className="text-sm">📍 Found at: {item.place}</p>
              <p className="text-sm">📦 Currently At: {item.currentLocation}</p>
            </>
          )}
          <p className="text-sm">📞 Contact: {item.contact}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-auto">
        <Button
          variant="outline"
          className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
          onClick={() => handleEdit(item)}
        >
          Edit
        </Button>
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
        <Tabs defaultValue="lost" className="w-full">
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


            <Button
              onClick={toggleForm}
              className="ml-4 bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white"
            >
              + Add
            </Button>
          </div>

          {/* Form Section */}
          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 p-4 bg-muted rounded-md border border-border grid gap-4"
            >
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  {...register("type")}
                  className="w-full p-2 mt-1 border rounded-md bg-background text-foreground"
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input {...register("itemName")} placeholder="(e.g., Wallet)" />
              </div>
              <div>
                <Label htmlFor="place">
                  {selectedType === "found" ? "Place Found At" : "Place Lost At"}
                </Label>
                <Input {...register("place")} placeholder="(e.g., Canteen)" />
              </div>
              {selectedType === "found" && (
                <div>
                  <Label htmlFor="currentLocation">Currently At</Label>
                  <Input
                    {...register("currentLocation")}
                    placeholder="(e.g., Security Desk)"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input {...register("contact")} placeholder="(e.g., phone/email)" />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input {...register("image")} placeholder="Paste image link (optional)" />
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white mx-auto w-fit"
              >
                Submit
              </Button>
            </form>
          )}

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
