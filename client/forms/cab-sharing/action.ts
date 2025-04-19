"use server";

import prisma from "@/lib/prisma";
import { CabSharingFormSchema } from "./cabSharingSchema";

export async function createCabSharing(data: CabSharingFormSchema) {
	const { origin, destination, date, userId } = data;

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
