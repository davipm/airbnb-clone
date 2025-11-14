import { ORPCError } from '@orpc/server';
import z from 'zod';
import { publicProcedure } from '@/server/orpc';
import { prisma } from '@/server/prisma';

const todosSchema = z.object({
  id: z.number().min(1),
  text: z.string().min(1, 'Please add some text'),
  completed: z.boolean(),
});

export const todoRouter = {
  getAll: publicProcedure
    .route({ method: 'GET', path: '/todos' })
    .output(z.array(todosSchema))
    .handler(() => {
      return prisma.todos.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    }),

  create: publicProcedure
    .route({ method: 'POST', path: '/todos' })
    .input(todosSchema.omit({ id: true, completed: true }))
    .output(todosSchema)
    .handler(({ input }) => {
      return prisma.todos.create({
        data: {
          text: input.text,
        },
      });
    }),

  toggle: publicProcedure
    .route({ method: 'PUT', path: '/todos/{id}' })
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .output(todosSchema)
    .handler(async ({ input }) => {
      const { id, completed } = input;

      const todo = await prisma.todos.findUnique({
        where: { id },
      });

      if (!todo) {
        throw new ORPCError('NOT_FOUND', {
          message: `Todo with id ${id} not found`,
        });
      }

      return prisma.todos.update({
        where: { id },
        data: { completed },
      });
    }),

  delete: publicProcedure
    .route({ method: 'DELETE', path: '/todos/{id}' })
    .input(z.object({ id: z.number() }))
    .output(todosSchema)
    .handler(async ({ input }) => {
      const todo = await prisma.todos.findUnique({
        where: { id: input.id },
      });

      if (!todo) {
        throw new ORPCError('NOT_FOUND', {
          message: `Todo with id ${input.id} not found`,
        });
      }

      return prisma.todos.delete({
        where: { id: input.id },
      });
    }),
};
