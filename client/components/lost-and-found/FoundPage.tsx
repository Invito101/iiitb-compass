import { lostAndFoundWithUserType } from "@/types/prisma-types";

export default function FoundPage({
	foundItems,
}: {
	foundItems: lostAndFoundWithUserType[];
}) {
	return (
		<div>
			{foundItems.map((item) => (
				<div>{item.user.name}</div>
			))}
		</div>
	);
}
