"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CabShare = {
  id: number;
  date: string;
  time: string;
  route: string;
  contact: string;
};

export default function ViewCabShares() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [cabShares, setCabShares] = useState<CabShare[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cabshares");
    if (saved) {
      setCabShares(JSON.parse(saved));
    }
  }, []);

  const filteredCabShares = selectedDate
    ? cabShares.filter((cab) => cab.date === selectedDate)
    : cabShares;

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-purple-800 to-fuchsia-800 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available CabShares</h1>

      <Card className="mb-8 max-w-md mx-auto border border-white/20 bg-black/40">
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <Card className="mb-12 max-w-xl mx-auto border border-white/20 bg-black/40">
          <CardHeader>
            <CardTitle>
              CabShares on {formatDate(selectedDate)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredCabShares.length === 0 ? (
              <p>No cabshares found.</p>
            ) : (
              <ul className="space-y-4">
                {filteredCabShares.map((cab) => (
                  <li
                    key={cab.id}
                    className="p-4 border border-white/20 rounded bg-black/30"
                  >
                    <div><strong>Time:</strong> {cab.time}</div>
                    <div><strong>Route:</strong> {cab.route}</div>
                    <div><strong>Contact:</strong> {cab.contact}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button 
          onClick={() => router.push("/cabshare/create")}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md drop-shadow-sm transition-all border"
        >
          Add CabShare
        </Button>
      </div>
    </div>
  );
}
