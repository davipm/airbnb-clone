import { ORPCError } from '@orpc/server';
import z from 'zod';
import { protectedProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

const postSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  category: z.string(),
  imageSrc: z.string(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  guestCount: z.number(),
  price: z.string(),
  location: z.object({
    value: z.string(),
  }),
});

export const listingRouter = {
  create: protectedProcedure
    .route({ method: 'POST', path: '/listings' })
    .input(postSchema)
    .handler(({ input, context }) => {
      const { location, price, ...rest } = input;
      return prisma.listing.create({
        data: {
          ...rest,
          locationValue: location.value,
          price: parseInt(price, 10),
          userId: context.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .route({ method: 'DELETE', path: '/listings/{listingId}' })
    .input(z.object({ listingId: z.string().min(1) }))
    .handler(async ({ input, context }) => {
      const listing = await prisma.listing.findUnique({
        where: {
          id: input.listingId,
          userId: context.session.user.id,
        },
      });

      if (!listing) {
        throw new ORPCError('NOT_FOUND', {
          message: `Listing with id ${input.listingId} not found`,
        });
      }

      return prisma.listing.deleteMany({
        where: { id: input.listingId, userId: context.session.user.id },
      });
    }),
};
