import { z } from "zod";

export const lostFormSchema = z.object({
	lostItem: z.string().min(1, "Item name is required"),
	location: z.string().min(1, "Location is required"),
	date: z.date(),
	description: z.string(),
});

export type LostFormSchema = z.infer<typeof lostFormSchema>;

export const foundFormSchema = z.object({
	foundItem: z.string().min(1, "Item name is required"),
	location: z.string().min(1, "Location is required"),
	currentLocation: z.string().min(1, "Current location is required"),
	date: z.date(),
	description: z.string(),
});

export type FoundFormSchema = z.infer<typeof foundFormSchema>;
