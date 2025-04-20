"use server";

import prisma from "@/lib/prisma";
import { FoundFormSchema, LostFormSchema } from "./lostAndFoundSchema";
import { auth } from "@/auth";

export async function createLostItem(data: LostFormSchema) {
	const { lostItem, location, date, description } = data;

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

export async function createFoundItem(data: FoundFormSchema) {
	const { foundItem, currentLocation, location, date, description } = data;

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

	const foundItemEntry = await prisma.lostAndFound.create({
		data: {
			name: foundItem,
			location,
			date,
			userId,
			description,
			type: "found",
			currentLocation,
		},
	});

	return {
		foundItemEntry,
		message: "Found item entry created successfully",
	};
}

export async function getLostItems() {
	const lostItems = await prisma.lostAndFound.findMany({
		where: {
			type: "lost",
		},
		include: {
			user: {},
		},
	});

	return lostItems;
}

export async function getFoundItems() {
	const foundItems = await prisma.lostAndFound.findMany({
		where: {
			type: "found",
		},
		include: {
			user: {},
		},
	});

	return foundItems;
}
