"use server";
import prisma from "@/lib/prisma";

export async function getFoodMenuByDate(date: Date) {
	const foodMenuCycle = await prisma.foodMenuCycle.findMany({
		where: {
			startDate: {
				lte: date,
			},
			endDate: {
				gte: date,
			},
		},
		include: {
			FoodMenuEntries: {
				include: {
					foodItem: {},
					FoodItemRating: {},
				},
			},
		},
	});

	return foodMenuCycle;
}
