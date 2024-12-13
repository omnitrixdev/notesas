import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  getAllNotes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        _count: {
          select: {
            Note: true,
          },
        },
        Note: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
          },
        },
        Subscription: {
          select: {
            status: true,
          },
        },
      },
    });
  }),

  getNoteById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.note.findUnique({
        where: {
          id: input.id,
        },
        select: {
          title: true,
          description: true,
        },
      });
    }),

  createNote: protectedProcedure
    .input(z.object({ title: z.string().min(1), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          title: input.title,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),

  editNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
        },
      });
    }),

  deleteNote: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
