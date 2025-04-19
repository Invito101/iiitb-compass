"use server";

import prisma from "@/lib/prisma";
import { CabSharingFormSchema } from "./cabSharingSchema";
import { auth } from "@/auth";

export async function createCabSharing(data: CabSharingFormSchema) {
	const { origin, destination, date } = data;

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

	const cabSharing = await prisma.cabShare.create({
		data: {
			origin,
			destination,
			date,
			userId,
		},
	});

	return {
		cabSharing,
		message: "Cab sharing created successfully",
	};
}

export async function deleteCabSharing(id: string) {
	const cabSharing = await prisma.cabShare.findUnique({
		where: {
			id,
		},
	});

	if (!cabSharing) {
		return {
			error: "Cab sharing not found",
		};
	}
	await prisma.cabShare.delete({
		where: {
			id,
		},
	});

	return {
		message: "Cab sharing deleted successfully",
	};
}

export async function getAllCabSharing(date: Date) {
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date);
	endOfDay.setHours(23, 59, 59, 999);
	const cabSharing = await prisma.cabShare.findMany({
		include: {
			user: {
				include: {},
			},
		},
		where: {
			date: {
				gte: startOfDay,
				lte: endOfDay,
			},
		},
	});

	return cabSharing;
}
