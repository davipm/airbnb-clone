import type { RouterClient } from '@orpc/server';
import { protectedProcedure, publicProcedure } from '@/server/orpc';
import { todoRouter } from '@/server/orpc/routers/todo';

export const appRouter = {
  todos: todoRouter,
  healthCheck: publicProcedure.handler(() => 'OK'),
  privateData: protectedProcedure.handler(({ context }) => ({
    message: 'This is private',
    user: context.session?.user,
  })),
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
