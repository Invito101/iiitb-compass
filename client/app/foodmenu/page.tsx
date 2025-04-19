"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

type MenuItem = {
  id: string
  name: string
  type: "veg" | "nonveg" | "egg"
}

type MenuCategory = {
  title: string
  items: MenuItem[]
}

// Example weekly menus; replace with real data or fetch from an API
const weeklyMenu: Record<string, MenuCategory[]> = {
  Monday: [
    {
      title: "Breakfast",
      items: [
        { id: "pancakes", name: "Pancakes", type: "veg" },
        { id: "omelette", name: "Omelette", type: "egg" },
        { id: "potato", name: "potato", type: "veg" },
      ],
    },
    {
      title: "Lunch",
      items: [
        { id: "grilled-chicken", name: "Grilled Chicken", type: "nonveg" },
        { id: "veggie-burger", name: "Veggie Burger", type: "veg" },
      ],
    },
    {
      title: "Snacks",
      items: [
        { id: "fries", name: "French Fries", type: "veg" },
        { id: "nachos", name: "Nachos", type: "veg" },
      ],
    },
    {
      title: "Dinner",
      items: [
        { id: "steak", name: "Steak", type: "nonveg" },
        { id: "salmon", name: "Salmon", type: "nonveg" },
      ],
    },
  ],
  // Fallback for other days; clone Monday menu
  default: [] as MenuCategory[],
}
weeklyMenu.default = weeklyMenu.Monday

const TopBar: React.FC = () => (
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
        className="rounded-full object-cover cursor-pointer border-2 border-black/10 dark:border-white"
      />
    </div>
  </div>
)

const Section: React.FC<MenuCategory> = ({ title, items }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <Card>
      <CardContent className="p-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
          >
            <div className="flex items-center">
              {item.type === "veg" && <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />}
              {item.type === "egg" && <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />}
              {item.type === "nonveg" && <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />}
              <span className="text-lg">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Upvote">
                <ThumbsUp />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Downvote">
                <ThumbsDown />
              </Button>
              <Link href={`/review/${item.id}`}>
                <Button variant="ghost" size="icon" aria-label="Comment">
                  <MessageSquare />
                </Button>
              </Link>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="px-4 py-3 text-sm text-muted-foreground">
            No items available.
          </div>
        )}
      </CardContent>
    </Card>
  </div>
)

const FoodMenuPage: React.FC = () => {
  const todayISO = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState<string>(todayISO)

  const dayName = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" })
  const menuToShow = weeklyMenu[dayName] || weeklyMenu.default

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="date" className="text-sm font-medium">
            Select Date:
          </Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {menuToShow.map((section) => (
          <Section
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </main>
    </div>
  )
}

export default FoodMenuPage
