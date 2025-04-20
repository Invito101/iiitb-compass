import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session) {
			return new Response("Unauthorized", { status: 401 });
		}

		const user = session.user.id;
		const { id } = await req.json();
		if (!id) {
			return new Response("Missing id", { status: 400 });
		}

		const item = await prisma.lostAndFound.deleteMany({
			where: {
				id: id,
				userId: user,
			},
		});
		if (!item) {
			return new Response("Item not found", { status: 404 });
		}
		return new Response("Item deleted", { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return new Response(error.message, { status: 500 });
		}
		return new Response("Internal Server Error", { status: 500 });
	}
}
