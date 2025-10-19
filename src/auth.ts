import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/instances/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
