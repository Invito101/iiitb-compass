"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FoodItemSchema } from "./foodItemSchema";

export async function rateFoodItem({ data }: { data: FoodItemSchema }) {
	const { foodEntryId, rating, comment, imageUrl } = data;
	const session = await auth();
	if (session?.user.id === undefined) {
		return {
			error: "User not found",
		};
	}

	const userId = session.user.id;
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return {
			error: "User not found",
		};
	}

	const alreadyExists = await prisma.foodItemRating.findFirst({
		where: {
			foodMenuEntryId: foodEntryId,
			userId: userId,
		},
	});

	if (alreadyExists) {
		return {
			error: "You have already rated this food item",
		};
	}

	const foodItemRating = await prisma.foodItemRating.create({
		data: {
			userId,
			status: "active",
			comment: comment,
			imageUrl: imageUrl,
			rating,
			foodMenuEntryId: foodEntryId,
		},
	});

	return foodItemRating;
}
