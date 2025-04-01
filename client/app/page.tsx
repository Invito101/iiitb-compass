import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await auth();
	if (!session?.user) {
		redirect("/auth");
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold">
					Welcome, {session.user.name}
				</h1>
				<p className="mt-4">You are logged in!</p>
			</div>
		</div>
	);
}
