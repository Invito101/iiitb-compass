import { auth } from "@/auth";
import ProfilePageComponenet from "@/components/profile/ProfilePageComponenet";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
	const session = await auth();
	if (!session) {
		redirect("/auth");
		return;
	}

	if (!session.user) {
		redirect("/auth");
		return;
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) {
		return <div>User not found</div>;
	}
	return <ProfilePageComponenet user={user}></ProfilePageComponenet>;
}
