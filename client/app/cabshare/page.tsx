export const dynamic = "force-dynamic";

import DisplayRides from "@/components/cabshare/DisplayRides";
import prisma from "@/lib/prisma";

export default async function CabSharePage() {
	const cabShares = await prisma.cabShare.findMany({
		include: {
			user: true,
		},
	});

	return <DisplayRides cabShares={cabShares}></DisplayRides>;
}
