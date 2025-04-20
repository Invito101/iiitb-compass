import { z } from "zod";

export const ProfileFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	rollNumber: z.string().min(5, {
		message: "Roll number must be at least 5 characters.",
	}),
	phone: z.string().min(10, {
		message: "Phone number must be at least 10 digits.",
	}),
	image: z.string().optional(),
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;
