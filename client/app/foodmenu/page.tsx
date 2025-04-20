import DisplayFoodMenu from "@/components/food-menu/DisplayFoodMenu";
import prisma from "@/lib/prisma";

export default async function FoodMenuPage() {
	const foodMenuCycle = await prisma.foodMenuCycle.findMany({
		where: {
			startDate: {
				lte: new Date(),
			},
			endDate: {
				gte: new Date(),
			},
		},
		include: {
			FoodMenuEntries: {
				include: {
					foodItem: true,
					FoodItemRating: {
						include: { user: true },
					},
				},
			},
		},
	});

	if (!foodMenuCycle || foodMenuCycle.length === 0) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-lg text-muted-foreground">
					No food menu available.
				</p>
			</div>
		);
	}

	return <DisplayFoodMenu foodMenu={foodMenuCycle[0]}></DisplayFoodMenu>;
}
