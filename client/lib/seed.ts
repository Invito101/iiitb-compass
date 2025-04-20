import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const days = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const mealOptions = {
	Breakfast: [
		{ name: "Idli Sambar", dietType: ["veg", "jain"] },
		{ name: "Poha", dietType: ["veg", "vegan", "jain"] },
		{ name: "Omelette", dietType: ["egg"] },
		{ name: "Aloo Paratha", dietType: ["veg", "jain"] },
		{ name: "Vegan Smoothie Bowl", dietType: ["vegan"] },
	],
	Lunch: [
		{ name: "Rajma Chawal", dietType: ["veg", "jain"] },
		{ name: "Chicken Curry", dietType: ["non-veg"] },
		{ name: "Egg Bhurji", dietType: ["egg"] },
		{ name: "Tofu Stir Fry", dietType: ["vegan"] },
		{ name: "Paneer Butter Masala", dietType: ["veg"] },
	],
	Snacks: [
		{ name: "Samosa", dietType: ["veg"] },
		{ name: "Vegan Cookies", dietType: ["vegan"] },
		{ name: "Boiled Eggs", dietType: ["egg"] },
		{ name: "Chicken Nuggets", dietType: ["non-veg"] },
		{ name: "Masala Corn", dietType: ["veg", "vegan", "jain"] },
	],
	Dinner: [
		{ name: "Grilled Salmon", dietType: ["non-veg"] },
		{ name: "Dal Tadka", dietType: ["veg", "jain"] },
		{ name: "Vegan Pasta", dietType: ["vegan"] },
		{ name: "Egg Fried Rice", dietType: ["egg"] },
		{ name: "Vegetable Biryani", dietType: ["veg"] },
	],
};

function getRandomItems<T>(arr: T[], n: number): T[] {
	const shuffled = arr.slice().sort(() => 0.5 - Math.random());
	return shuffled.slice(0, n);
}

async function seedFoodMenuItems() {
	const foodItemMap: Record<string, string> = {};
	for (const [mealType, items] of Object.entries(mealOptions)) {
		for (const item of items) {
			const created = await prisma.foodMenuItems.upsert({
				where: { name: item.name },
				update: {},
				create: {
					name: item.name,
					dietType: item.dietType,
				},
			});
			foodItemMap[item.name] = created.id;
		}
	}

	const startDate = new Date();
	const endDate = new Date();
	endDate.setDate(startDate.getDate() + 6);

	const cycle = await prisma.foodMenuCycle.create({
		data: {
			startDate,
			endDate,
			weekNumber: 1,
		},
	});

	for (const day of days) {
		for (const [mealType, options] of Object.entries(mealOptions)) {
			const selectedItems = getRandomItems(
				options,
				2 + Math.floor(Math.random() * 2)
			);

			for (const item of selectedItems) {
				await prisma.foodMenuEntries.create({
					data: {
						dayOfWeek: day,
						mealType,
						foodItemId: foodItemMap[item.name],
						foodMenuCycleId: cycle.id,
					},
				});
			}
		}
	}

	console.log("✅ Randomized food menu seeded successfully!");
}

function main() {
	console.log("🌱 Seeding randomized weekly food menu...");
	seedFoodMenuItems()
		.then(() => {
			console.log("✅ Seeding completed successfully!");
		})
		.catch((e) => {
			console.error("❌ Error seeding data:", e);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
}

main();
