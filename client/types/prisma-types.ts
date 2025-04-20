import { Prisma } from "@prisma/client";

export type lostAndFoundWithUserType = Prisma.LostAndFoundGetPayload<{
	include: { user: true };
}>;

export type foodMenuCycleWithEntriesWithItemAndRatingType =
	Prisma.FoodMenuCycleGetPayload<{
		include: {
			FoodMenuEntries: {
				include: { foodItem: true; FoodItemRating: true };
			};
		};
	}>;
