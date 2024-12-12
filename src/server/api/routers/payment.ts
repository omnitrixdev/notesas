import { z } from "zod";
import { getStripeSession, stripe } from "~/lib/stripe";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const paymentRouter = createTRPCRouter({
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        Subscription: {
          select: {
            status: true,
          },
        },
      },
    });

    return user;
  }),

  getCustomerPortal: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        stripeCustomerId: true,
        email: true,
      },
    });

    const customerPortal = await stripe.billingPortal.sessions.create({
      customer: user?.stripeCustomerId as string,
      return_url:
        process.env.NODE_ENV === "production"
          ? (process.env.PRODUCTION_URL as string)
          : "http://localhost:3000/dashboard",
    });

    return customerPortal;
  }),

  createStripePayment: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        stripeCustomerId: true,
        email: true,
      },
    });

    if (!user?.stripeCustomerId) {
      const userCustomerId = await stripe.customers.create({
        email: user?.email as string,
      });

      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          stripeCustomerId: userCustomerId.id as string,
        },
      });
    }

    return await getStripeSession({
      priceId: process.env.STRIPE_PRICE_ID as string,
      customerId: user?.stripeCustomerId as string,
      domainUrl:
        process.env.NODE_ENV == "production"
          ? (process.env.PRODUCTION_URL as string)
          : "http://localhost:3000",
    });
  }),

  createUserSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const subscribe = await ctx.db.subscription.create({
      data: {
        userId: ctx.session.user.id,
        status: "active",
        planId: process.env.STRIPE_PRICE_ID as string,
        currentPeriodStart: 123,
        currentPeriodEnd: 321,
        invterval: "month",
        stripeSubscriptionId: "123",
      },
    });

    return subscribe;
  }),
});
