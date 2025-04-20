import DisplayFoodItem from "@/components/food-menu/food-item/DisplayFoodItem";
import prisma from "@/lib/prisma";

export default async function FoodItemPage({
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
		return <div>Page not found</div>;
	}

	return <DisplayFoodItem foodEntry={foodEntry}></DisplayFoodItem>;
}
