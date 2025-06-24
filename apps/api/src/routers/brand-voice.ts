import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc/trpc';
import { BrandVoiceAgent } from '@neon/core-agents';

// Initialize the Brand Voice Agent
const brandVoiceAgent = new BrandVoiceAgent();

// Input validation schemas
const BrandVoiceProfileSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  guidelines: z.record(z.any()),
  keywords: z.array(z.string()),
  toneProfile: z.record(z.any()),
  sampleContent: z.record(z.any()).optional(),
});

const ContentAnalysisSchema = z.object({
  content: z.string().min(1),
  contentType: z.enum(['email', 'social', 'blog', 'ad', 'general']).default('general'),
  brandVoiceId: z.string().optional(),
});

export const brandVoiceRouter = router({
  // Content Analysis
  analyzeContent: protectedProcedure
    .input(ContentAnalysisSchema)
    .mutation(async ({ input }) => {
      try {
        // Use the Brand Voice Agent to analyze content
        const result = await brandVoiceAgent.analyzeContentPublic(
          input.content,
          input.contentType,
          input.brandVoiceId
        );

        if (!result.success) {
          throw new Error(result.error || 'Content analysis failed');
        }

        return {
          success: true,
          voiceScore: result.voiceScore,
          suggestions: result.suggestions,
          analysis: result.analysis,
        };
      } catch (error) {
        throw new Error(`Content analysis failed: ${error}`);
      }
    }),

  scoreContent: publicProcedure
    .input(ContentAnalysisSchema.omit({ brandVoiceId: true }))
    .mutation(async ({ input }) => {
      try {
        const result = await brandVoiceAgent.scoreContentPublic(input.content);

        if (!result.success) {
          throw new Error(result.error || 'Content scoring failed');
        }

        return {
          success: true,
          voiceScore: result.voiceScore,
          analysis: result.analysis,
        };
      } catch (error) {
        throw new Error(`Content scoring failed: ${error}`);
      }
    }),

  getSuggestions: publicProcedure
    .input(ContentAnalysisSchema.omit({ brandVoiceId: true }))
    .mutation(async ({ input }) => {
      try {
        const result = await brandVoiceAgent.getSuggestionsPublic(
          input.content,
          input.contentType
        );

        if (!result.success) {
          throw new Error(result.error || 'Suggestion generation failed');
        }

        return {
          success: true,
          suggestions: result.suggestions,
        };
      } catch (error) {
        throw new Error(`Suggestion generation failed: ${error}`);
      }
    }),

  getGuidelines: publicProcedure
    .input(z.object({ brandVoiceId: z.string().optional() }))
    .mutation(async ({ input }) => {
      try {
        // Return default guidelines
        const result = await brandVoiceAgent.execute({
          task: 'get_guidelines',
          context: { action: 'get_guidelines' },
          priority: 'medium',
        });

        if (!result.success) {
          throw new Error(result.error || 'Failed to get guidelines');
        }

        return {
          success: true,
          guidelines: result.guidelines,
        };
      } catch (error) {
        throw new Error(`Failed to get guidelines: ${error}`);
      }
    }),
});