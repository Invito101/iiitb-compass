import { z } from "zod";

export const foodItemSchema = z.object({
	foodEntryId: z.string(),
	rating: z.number().min(1).max(5),
	comment: z.string().optional(),
	imageUrl: z.string().optional(),
});

export type FoodItemSchema = z.infer<typeof foodItemSchema>;
