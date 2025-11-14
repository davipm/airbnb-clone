import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { customSession } from 'better-auth/plugins';
import { prisma } from '@/server/prisma';

export const auth = betterAuth<BetterAuthOptions>({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ''],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    customSession(async ({ user, session }) => {
      try {
        const currentUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        const favorites = await prisma.listing.findMany({
          where: {
            id: {
              in: [...(currentUser?.favoriteIds || [])],
            },
          },
        });

        if (!currentUser) {
          return session;
        }

        return {
          ...session,
          user: {
            ...user,
            favorites: favorites.map((favorite) => ({
              ...favorite,
              createdAt: favorite.createdAt.toISOString(),
            })),
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.createdAt.toISOString(),
            emailVerified: user.emailVerified,
          },
        };
      } catch (error) {
        console.log('Error retrieving user data', error);
        return session;
      }
    }),
    nextCookies(),
  ],
});
