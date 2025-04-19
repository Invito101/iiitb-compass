import { z } from "zod";

export const cabSharingFormSchema = z.object({
	origin: z.string().min(1, "Origin is required"),
	destination: z.string().min(1, "Destination is required"),
	date: z.date(),
});

export type CabSharingFormSchema = z.infer<typeof cabSharingFormSchema>;
