"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const routes = [
  { label: "IIITB → Airport", value: "iiitb->airport" },
  { label: "Airport → IIITB", value: "airport->iiitb" },
];

export default function AddCabSharePage() {
  const [routeOpen, setRouteOpen] = useState(false);
  const [newCabShare, setNewCabShare] = useState({
    date: "",
    time: "",
    route: "iiitb->airport",
    contact: "",
  });

  const router = useRouter();

  const addCabShare = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(newCabShare.contact)) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    const existingCabShares = JSON.parse(localStorage.getItem("cabshares") || "[]");

    const newEntry = {
      id: Date.now(), // unique id
      ...newCabShare,
    };

    localStorage.setItem("cabshares", JSON.stringify([...existingCabShares, newEntry]));

    router.push("/cabshare");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-800 to-fuchsia-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add CabShare</h1>

      <Card className="max-w-xl mx-auto bg-black/50 p-6 rounded-xl shadow-lg border border-white/20">
        <CardHeader>
          <CardTitle>New CabShare</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addCabShare} className="space-y-4 flex-col flex">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newCabShare.date}
                onChange={(e) => setNewCabShare({ ...newCabShare, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newCabShare.time}
                onChange={(e) => setNewCabShare({ ...newCabShare, time: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Route</Label>
              <Popover open={routeOpen} onOpenChange={setRouteOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "bg-black/30 border-white/20 w-full justify-start"
                    )}
                  >
                    {
                      routes.find((r) => r.value === newCabShare.route)?.label ??
                      "Select route"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black/90 text-white">
                  <Command className="bg-transparent text-white">
                    <CommandList>
                      {routes.map((route) => (
                        <CommandItem
                          key={route.value}
                          className="hover:bg-white/10 cursor-pointer"
                          onSelect={() => {
                            setNewCabShare({ ...newCabShare, route: route.value });
                            setRouteOpen(false);
                          }}
                        >
                          {route.label}
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
                inputMode="numeric"
                pattern="\d{10}"
                maxLength={10}
                minLength={10}
                value={newCabShare.contact}
                onChange={(e) => setNewCabShare({ ...newCabShare, contact: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border"
              >
                Add CabShare
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
