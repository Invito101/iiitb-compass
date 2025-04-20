"use server";
import prisma from "@/lib/prisma";
import { ProfileFormSchemaType } from "./profileSchema";

export async function updateProfile(data: ProfileFormSchemaType) {
	const { name, email, rollNumber, phone, image } = data;

	const user = await prisma.user.update({
		where: {
			email: email,
		},
		data: {
			name: name,
			rollNumber: rollNumber,
			phone,
			image: image,
		},
	});

	if (!user) {
		throw new Error("User not found");
	}
	return user;
}
