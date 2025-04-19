import { z } from "zod";

export const cabSharingFormSchema = z.object({
	origin: z.string().min(1, "Origin is required"),
	destination: z.string().min(1, "Destination is required"),
	date: z.date(),
	userId: z.string().min(1, "User ID is required"),
});

export type CabSharingFormSchema = z.infer<typeof cabSharingFormSchema>;
