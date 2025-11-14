import z from 'zod';
import { protectedProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

const postSchema = z.object({
  listingId: z.string().min(1),
});

export const favoriteRouter = {
  create: protectedProcedure
    .route({ method: 'POST', path: '/favorites/{listingId}' })
    .input(postSchema)
    .handler(({ input, context }) => {
      // @ts-expect-error
      const favoriteIds = [...(context.session.user.favorites || [])];

      favoriteIds.push(input.listingId);

      return prisma.user.update({
        where: { id: context.session.user.id },
        data: { favoriteIds },
      });
    }),

  delete: protectedProcedure
    .route({ method: 'DELETE', path: '/favorites/{listingId}' })
    .input(postSchema)
    .handler(async ({ input, context }) => {
      // @ts-expect-error
      let favoriteIds = [...(context.session.user.favorites || [])];

      favoriteIds = favoriteIds.filter((id) => id !== input.listingId);

      return prisma.user.update({
        where: { id: context.session.user.id },
        data: { favoriteIds },
      });
    }),
};
