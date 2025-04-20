"use client";
import { lostAndFoundWithUserType } from "@/types/prisma-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Trash } from "lucide-react";

export default function LostPage({
  lostItems,
}: {
  lostItems: lostAndFoundWithUserType[];
}) {
  const { data } = useSession();
  const currentUserId = data?.user.id;

  return (
    <div className="w-full px-2 py-6">
      {lostItems.length === 0 ? (
        <p className="text-muted-foreground text-lg">
          No lost items yet. 🥲
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-0">
          {lostItems.map((item) => (
            <Card
              key={item.id}
              className="border border-border rounded-lg bg-card shadow flex flex-col h-full overflow-hidden"
            >
              <div className="relative w-full h-48 bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200">
                    <p className="text-gray-500">No image</p>
                  </div>
                )}
              </div>

              <CardContent className="p-4 flex-1">
                <h3 className="font-bold text-lg mb-3">{item.name}</h3>
                
                <p className="text-sm text-gray-600 mb-2">
                  {item.type === "FOUND" ? "Found at: " : "Lost at: "} 
                  {item.location}
                </p>
                
                {item.type === "FOUND" && item.currentLocation && (
                  <p className="text-sm text-gray-600 mb-2">
                    Currently at: {item.currentLocation}
                  </p>
                )}
                
                {item.description && (
                  <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                    {item.description}
                  </p>
                )}
                
                <p className="text-sm font-medium">
                  {item.user.phone || "No number provided"}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between p-4 pt-3 border-t border-border">
                <p className="text-xs text-gray-500">
                  {new Date(item.date).toISOString().split("T")[0]}
                </p>
                
                {item.userId === currentUserId && (
                  <div className="flex gap-2">
                    <Link href={`/lostfound/addlost?edit=${item.id}`}>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white p-0 w-8 h-8 flex items-center justify-center"
                      size="sm"
                      // onClick={} // TODO: hook up delete later
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}