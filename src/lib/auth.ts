import { db } from "@/database";
import { Company, company, Individuals, users } from "@/database/schema/users";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { type: "text" },
        password: { type: "text" },
        username: { type: "text" },
      },
      authorize: async (credentials) => {
        let tar: Individuals[] | Company[];
        if (credentials?.username == "company") {
          tar = await db
            .select()
            .from(company)
            .where(eq(company.email, credentials?.email as string))
            .limit(1);
        } else {
          tar = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials?.email as string))
            .limit(1);
        }

        if (tar.length < 1) {
          throw new Error("User Not Registered.");
        }

        const correctPassword = await compare(
          credentials?.password as string,
          tar[0].password,
        );

        if (!correctPassword) {
          throw new Error("Invalid Credentials");
        }

        return {
          email: tar[0].email,
          image: credentials?.username,
        } as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
