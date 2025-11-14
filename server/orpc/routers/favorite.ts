import { ORPCError } from '@orpc/server';
import z from 'zod';
import { protectedProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

const postSchema = z.object({
  listingId: z.string().min(1),
});

export const favoriteRouter = {
  create: protectedProcedure
    .route({ method: 'POST', path: '/listings/{listingId}' })
    .input(postSchema)
    .handler(({ input, context }) => {}),

  delete: protectedProcedure
    .route({ method: 'DELETE', path: '/listings/{listingId}' })
    .input(z.object({ listingId: z.string().min(1) }))
    .handler(async ({ input, context }) => {
      //
    }),
};
