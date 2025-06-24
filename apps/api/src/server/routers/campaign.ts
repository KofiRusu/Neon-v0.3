import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { type CampaignType, type CampaignStatus } from '@neon/data-model';

export const campaignRouter: any = createTRPCRouter({
  // Get all campaigns
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED']).optional(),
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = {
        ...(input.userId && { userId: input.userId }),
        ...(input.status && { status: input.status as CampaignStatus }),
      };

      return ctx.db.campaign.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: input.offset,
        take: input.limit,
      });
    }),

  // Get campaign by ID
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.campaign.findUnique({
      where: { id: input.id },
      include: {
        user: true,
      },
    });
  }),

  // Create new campaign
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        type: z.enum([
          'CONTENT_GENERATION',
          'AD_OPTIMIZATION',
          'B2B_OUTREACH',
          'TREND_ANALYSIS',
          'DESIGN_GENERATION',
        ]),
        userId: z.string(),
        status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED']).default('DRAFT'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaign.create({
        data: {
          name: input.name,
          type: input.type as CampaignType,
          status: input.status as CampaignStatus,
          userId: input.userId,
        },
        include: {
          user: true,
        },
      });
    }),

  // Update campaign
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'FAILED']).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.campaign.update({
        where: { id },
        data: data as { name?: string; status?: CampaignStatus },
        include: {
          user: true,
        },
      });
    }),

  // Delete campaign
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.campaign.delete({
        where: { id: input.id },
      });
    }),

  // Get campaign statistics
  getStats: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const where = input.userId ? { userId: input.userId } : {};

      const [total, active, completed] = await Promise.all([
        ctx.db.campaign.count({ where }),
        ctx.db.campaign.count({
          where: { ...where, status: 'ACTIVE' },
        }),
        ctx.db.campaign.count({
          where: { ...where, status: 'COMPLETED' },
        }),
      ]);

      return {
        total,
        active,
        completed,
        draft: total - active - completed,
      };
    }),
});
