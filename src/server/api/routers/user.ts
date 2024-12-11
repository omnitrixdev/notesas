import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        colorScheme: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
          email: input.email,
          colorScheme: input.colorScheme,
        },
      });
    }),
});

type UserRouter = typeof userRouter;
type RouterInput = inferRouterInputs<UserRouter>;
type RouterOutput = inferRouterOutputs<UserRouter>;

// export type TypeEventRouterInput = RouterInput["create"];
export type TypeUser = RouterOutput["getCurrentUser"];
