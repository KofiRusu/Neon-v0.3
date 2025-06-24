import { ContentAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contentRouter: any = createTRPCRouter({
  generatePost: publicProcedure
    .input(z.object({
      type: z.enum(['blog', 'social_post', 'email', 'caption', 'copy']),
      topic: z.string(),
      audience: z.string(),
      tone: z.enum(['professional', 'casual', 'friendly', 'authoritative', 'playful']),
      keywords: z.array(z.string()).optional(),
      platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin', 'email']).optional()
    }))
    .mutation(async ({ input }) => {
      const contentAgent = new ContentAgent();
              const context = {
        type: input.type,
        topic: input.topic,
        audience: input.audience,
        tone: input.tone,
        ...(input.keywords && { keywords: input.keywords }),
        ...(input.platform && { platform: input.platform })
      };
      return await contentAgent.generatePost(context);
    }),

  generateBlog: publicProcedure
    .input(z.object({
      topic: z.string(),
      audience: z.string(),
      tone: z.enum(['professional', 'casual', 'friendly', 'authoritative', 'playful']),
      keywords: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const contentAgent = new ContentAgent();
      const context = {
        type: 'blog' as const,
        topic: input.topic,
        audience: input.audience,
        tone: input.tone,
        length: 'long' as const,
        ...(input.keywords && { keywords: input.keywords })
      };
      return await contentAgent.generateBlog(context);
    }),

  generateCaption: publicProcedure
    .input(z.object({
      topic: z.string(),
      audience: z.string(),
      tone: z.enum(['professional', 'casual', 'friendly', 'authoritative', 'playful']),
      platform: z.enum(['facebook', 'instagram', 'twitter', 'linkedin']).optional(),
    }))
    .mutation(async ({ input }) => {
      const contentAgent = new ContentAgent();
      const context = {
        type: 'caption' as const,
        topic: input.topic,
        audience: input.audience,
        tone: input.tone,
        length: 'short' as const,
        ...(input.platform && { platform: input.platform })
      };
      return await contentAgent.generateCaption(context);
    }),
}); 