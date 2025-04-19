"use server";

import prisma from "@/lib/prisma";
import { LostAndFoundFormSchema } from "./lostAndFoundSchema";

export async function createLostItem(data: LostAndFoundFormSchema) {
	const { lostItem, location, date, userId, description } = data;

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

	const lostItemEntry = await prisma.lostAndFound.create({
		data: {
			name: lostItem,
			location,
			date,
			userId,
			description,
			type: "lost",
		},
	});

	return {
		lostItemEntry,
		message: "Lost item entry created successfully",
	};
}

export async function createFoundItem();
