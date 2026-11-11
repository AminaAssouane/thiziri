import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import type { Adapter } from "next-auth/adapters";

const prismaAdapter = PrismaAdapter(prisma);

// Puts Google’s name into my existing firstName and lastName fields, and checks existing emails without case sensitivity :
const adapter: Adapter = {
  ...prismaAdapter,

  async createUser(user) {
    const email = user.email.trim().toLowerCase();
    const nameParts = (user.name ?? "").trim().split(/\s+/).filter(Boolean);

    const createdUser = await prisma.user.create({
      data: {
        email,
        firstName: nameParts[0] || email.split("@")[0],
        lastName: nameParts.slice(1).join(" "),
        emailVerified: user.emailVerified,
        image: user.image,
      },
    });

    return {
      id: createdUser.id,
      name: [createdUser.firstName, createdUser.lastName]
        .filter(Boolean)
        .join(" "),
      email: createdUser.email,
      emailVerified: createdUser.emailVerified,
      image: createdUser.image,
    };
  },

  async getUserByEmail(email) {
    return prisma.user.findFirst({
      where: {
        email: { equals: email, mode: "insensitive" },
      },
    });
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: adapter,
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !email ||
          !password
        ) {
          return null;
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await prisma.user.findFirst({
          where: { email: { equals: normalizedEmail, mode: "insensitive" } },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],
});
