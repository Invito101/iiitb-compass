import { Prisma } from "@prisma/client";

export type lostAndFoundWithUserType = Prisma.LostAndFoundGetPayload<{
	include: { user: true };
}>;
