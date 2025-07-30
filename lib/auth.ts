import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { admin, anonymous } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      redirectURI:
        env.ENVIRONMENT === "development" ? env.LOCALHOST_URL + "/api/auth/callback/github" : env.PRODUCTION_URL,
    },
  },
  plugins: [admin(), anonymous()],
});
