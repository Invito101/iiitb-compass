import { Prisma } from "@prisma/client";

export type lostAndFoundWithUserType = Prisma.LostAndFoundGetPayload<{
	include: { user: true };
}>;

export type foodMenuCycleWithEntriesWithItemAndRatingType =
	Prisma.FoodMenuCycleGetPayload<{
		include: {
			FoodMenuEntries: {
				include: {
					foodItem: true;
					FoodItemRating: {
						include: { user: true };
					};
				};
			};
		};
	}>;

export type foodMenuEntryWithItemAndRatingType =
	Prisma.FoodMenuEntriesGetPayload<{
		include: {
			foodItem: true;
			FoodItemRating: { include: { user: true } };
		};
	}>;
