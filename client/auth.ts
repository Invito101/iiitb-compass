import NextAuth from "next-auth";
import "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [GitHub],
	callbacks: {
		async session({ session, user }) {
			const dbUser = await db.user.findUnique({
				where: { email: session.user.email },
			});

			if (session.user && dbUser) {
				session.user.id = user.id;
			}

			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
});
