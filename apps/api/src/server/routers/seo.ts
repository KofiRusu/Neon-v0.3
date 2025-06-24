import { SEOAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const seoRouter = createTRPCRouter({
  optimizeKeywords: publicProcedure
    .input(z.object({
      content: z.string(),
      targetKeywords: z.array(z.string()),
      contentType: z.enum(['blog', 'page', 'product', 'article']),
      focusKeyword: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      url: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const seoAgent = new SEOAgent();
      return await seoAgent.optimizeKeywords(input);
    }),

  analyzeContent: publicProcedure
    .input(z.object({
      content: z.string(),
      keywords: z.array(z.string()),
    }))
    .query(async ({ input }) => {
      const seoAgent = new SEOAgent();
      return await seoAgent.analyzeContent(input.content, input.keywords);
    }),

  generateMetaTags: publicProcedure
    .input(z.object({
      content: z.string(),
      targetKeywords: z.array(z.string()),
      contentType: z.enum(['blog', 'page', 'product', 'article']),
      focusKeyword: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const seoAgent = new SEOAgent();
      return await seoAgent.generateMetaTags(input);
    }),

  analyzeKeywords: publicProcedure
    .input(z.object({
      content: z.string(),
      keywords: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const seoAgent = new SEOAgent();
      return await seoAgent.analyzeContent(input.content, input.keywords);
    }),

  auditTechnicalSEO: publicProcedure
    .input(z.object({
      content: z.string(),
      contentType: z.enum(['html', 'markdown']).default('markdown'),
    }))
    .mutation(async ({ input }) => {
      const seoAgent = new SEOAgent();
      return await seoAgent.auditTechnicalSEO(input.content, input.contentType);
    }),
}); 