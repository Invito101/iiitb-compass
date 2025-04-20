import prisma from "@/lib/prisma";

export default async function FoodCommentsPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = await params;
	const foodEntry = await prisma.foodMenuEntries.findUnique({
		where: {
			id: id,
		},
		include: {
			foodItem: true,
			FoodItemRating: {
				include: {
					user: true,
				},
			},
		},
	});

	if (!foodEntry) {
		return <div>Food item not found</div>;
	}

	return <div>a</div>;
}
