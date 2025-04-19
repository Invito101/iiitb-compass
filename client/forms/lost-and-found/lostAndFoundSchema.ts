import { z } from "zod";

export const lostAndFoundFormSchema = z.object({
	lostItem: z.string().min(1, "Item name is required"),
	location: z.string().min(1, "Location is required"),
	date: z.date(),
	userId: z.string().min(1, "User ID is required"),
	description: z.string(),
});

export type LostAndFoundFormSchema = z.infer<typeof lostAndFoundFormSchema>;
