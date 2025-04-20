"use client";
import { lostAndFoundWithUserType } from "@/types/prisma-types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

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
        <p className="text-muted-foreground text-lg">No lost items yet. 🥲</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mx-0">
          {lostItems.map((item) => (
            <div
              key={item.id}
              className="border border-border rounded-lg bg-card shadow flex flex-col h-64"
            >
              {/* Content Section - Scrollable with buttons inside */}
              <div className="p-3 flex-1 overflow-y-auto">
                <h3 className="font-bold text-base mb-1 truncate">{item.name}</h3>
                <p className="text-sm mb-1">
                  📅 {new Date(item.date).toISOString().split("T")[0]}
                </p>
                <p className="text-sm mb-1">📍 {item.location}</p>
                {item.description && (
                  <p className="text-sm mb-1">📝 {item.description}</p>
                )}
                <p className="text-sm mb-1">
                  📞 {item.user.phone || "No number"}
                </p>
                
                {/* Edit and Delete buttons inside the scrollable area */}
                {item.userId === currentUserId && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                    <Link href={`/lostfound/addlost?edit=${item.id}`} className="flex-1">
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs px-1 py-1 h-8"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs px-1 py-1 h-8"
                      size="sm"
                      // onClick={} // TODO: hook up delete later
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}