import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function ProfilePage() {
	const session = await auth();
	if (!session) {
		return <div>Unauthorized</div>;
	}

	if (!session.user) {
		return <div>Unauthorized</div>;
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) {
		return <div>User not found</div>;
	}
	return <div></div>;
}
