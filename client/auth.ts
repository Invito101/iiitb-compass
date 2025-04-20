import NextAuth from "next-auth";
import "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [GitHub],
	callbacks: {
		session: async ({ session, user }) => {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
});
