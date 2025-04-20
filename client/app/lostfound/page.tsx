export const dynamic = "force-dynamic";

import LostAndFound from "@/components/lost-and-found/LostAndFound";
import prisma from "@/lib/prisma";

export default async function LostAndFoundPage() {
	const lostItems = await prisma.lostAndFound.findMany({
		where: {
			type: "lost",
		},
		include: {
			user: {},
		},
	});

	const foundItems = await prisma.lostAndFound.findMany({
		where: {
			type: "found",
		},
		include: {
			user: {},
		},
	});

	return <LostAndFound lostItems={lostItems} foundItems={foundItems} />;
}
