import { SEOAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { logger } from "@neon/utils";

// Input validation schemas
const seoContextSchema = z.object({
  content: z.string().min(1, "Content is required"),
  targetKeywords: z.array(z.string()).min(1, "At least one target keyword is required"),
  contentType: z.enum(['blog', 'page', 'product', 'article']),
  focusKeyword: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  businessContext: z.string().optional(),
  targetAudience: z.string().optional(),
});

const metaTagsInputSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  content: z.string().min(1, "Content is required"),
  keywords: z.array(z.string()).optional(),
  businessContext: z.string().optional(),
  targetAudience: z.string().optional(),
  contentType: z.enum(['blog', 'page', 'product', 'article']).optional(),
});

const keywordRecommendationSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  businessContext: z.string().optional(),
});

const competitorAnalysisSchema = z.object({
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  industry: z.string().optional(),
});

const technicalAuditSchema = z.object({
  url: z.string().url("Valid URL is required"),
  content: z.string().min(1, "Content is required"),
});

export const seoRouter: any = createTRPCRouter({
  /**
   * Comprehensive SEO optimization with AI-powered analysis
   */
  optimizeKeywords: publicProcedure
    .input(seoContextSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const result = await seoAgent.optimizeKeywords(input);
        
        logger.info('SEO optimization completed', {
          contentLength: input.content.length,
          keywordCount: input.targetKeywords.length,
          seoScore: result.data?.seoScore
        }, 'SEORouter');

        return result;
      } catch (error) {
        logger.error('SEO optimization failed', { error, input: { ...input, content: 'truncated' } }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Analyze content for keyword performance and SEO metrics
   */
  analyzeContent: publicProcedure
    .input(z.object({
      content: z.string().min(1, "Content is required"),
      keywords: z.array(z.string()).min(1, "At least one keyword is required"),
    }))
    .query(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const analysis = await seoAgent.analyzeContent(input.content, input.keywords);
        
        logger.info('Content analysis completed', {
          contentLength: input.content.length,
          keywordCount: input.keywords.length,
          analysisResults: analysis.length
        }, 'SEORouter');

        return {
          success: true,
          data: analysis
        };
      } catch (error) {
        logger.error('Content analysis failed', { error, inputLength: input.content.length }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Generate AI-powered meta tags with OpenAI integration
   */
  generateMetaTags: publicProcedure
    .input(metaTagsInputSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const metaTags = await seoAgent.generateMetaTags(input);
        
        logger.info('Meta tags generated', {
          topic: input.topic,
          contentType: input.contentType,
          hasKeywords: Boolean(input.keywords?.length),
          titleLength: metaTags.title.length,
          descriptionLength: metaTags.description.length
        }, 'SEORouter');

        return {
          success: true,
          data: metaTags
        };
      } catch (error) {
        logger.error('Meta tags generation failed', { error, topic: input.topic }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Get AI-powered keyword recommendations
   */
  recommendKeywords: publicProcedure
    .input(keywordRecommendationSchema)
    .query(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const recommendations = await seoAgent.recommendKeywords(input);
        
        logger.info('Keyword recommendations generated', {
          topic: input.topic,
          recommendationCount: recommendations.length,
          hasBusinessContext: Boolean(input.businessContext)
        }, 'SEORouter');

        return {
          success: true,
          data: recommendations
        };
      } catch (error) {
        logger.error('Keyword recommendations failed', { error, topic: input.topic }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Analyze competitors for SEO insights
   */
  analyzeCompetitors: publicProcedure
    .input(competitorAnalysisSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const result = await seoAgent.execute({
          task: 'analyze_competitors',
          context: input,
          priority: 'medium'
        });
        
        logger.info('Competitor analysis completed', {
          keywordCount: input.keywords.length,
          industry: input.industry,
          success: result.success
        }, 'SEORouter');

        return result;
      } catch (error) {
        logger.error('Competitor analysis failed', { error, keywords: input.keywords }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Generate schema markup for content
   */
  generateSchema: publicProcedure
    .input(seoContextSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const result = await seoAgent.execute({
          task: 'generate_schema',
          context: input,
          priority: 'medium'
        });
        
        logger.info('Schema markup generated', {
          contentType: input.contentType,
          title: input.title,
          success: result.success
        }, 'SEORouter');

        return result;
      } catch (error) {
        logger.error('Schema generation failed', { error, contentType: input.contentType }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Perform technical SEO audit
   */
  auditTechnicalSEO: publicProcedure
    .input(technicalAuditSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        const result = await seoAgent.execute({
          task: 'audit_technical_seo',
          context: input,
          priority: 'medium'
        });
        
        logger.info('Technical SEO audit completed', {
          url: input.url,
          contentLength: input.content.length,
          issuesFound: result.data?.length || 0,
          success: result.success
        }, 'SEORouter');

        return result;
      } catch (error) {
        logger.error('Technical SEO audit failed', { error, url: input.url }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Get comprehensive SEO analysis (combines multiple features)
   */
  getComprehensiveAnalysis: publicProcedure
    .input(seoContextSchema)
    .mutation(async ({ input }) => {
      try {
        const seoAgent = new SEOAgent();
        
        // Run multiple analyses in parallel for better performance
        const [
          contentAnalysis,
          keywordRecommendations,
          technicalAudit,
          schemaMarkup
        ] = await Promise.all([
          seoAgent.execute({
            task: 'analyze_content',
            context: input,
            priority: 'high'
          }),
          seoAgent.recommendKeywords({
            topic: input.focusKeyword || input.targetKeywords[0],
            businessContext: input.businessContext
          }),
          input.url ? seoAgent.execute({
            task: 'audit_technical_seo',
            context: { url: input.url, content: input.content },
            priority: 'medium'
          }) : Promise.resolve(null),
          seoAgent.execute({
            task: 'generate_schema',
            context: input,
            priority: 'low'
          })
        ]);

        const comprehensiveReport = {
          contentAnalysis: contentAnalysis.data,
          keywordRecommendations,
          technicalAudit: technicalAudit?.data || [],
          schemaMarkup: schemaMarkup.data,
          summary: {
            overallScore: contentAnalysis.data?.seoScore || 0,
            criticalIssues: (contentAnalysis.data?.suggestions || []).filter((s: any) => s.severity === 'critical').length,
            recommendations: keywordRecommendations.length,
            technicalIssues: technicalAudit?.data?.length || 0
          }
        };
        
        logger.info('Comprehensive SEO analysis completed', {
          overallScore: comprehensiveReport.summary.overallScore,
          criticalIssues: comprehensiveReport.summary.criticalIssues,
          recommendations: comprehensiveReport.summary.recommendations,
          contentType: input.contentType
        }, 'SEORouter');

        return {
          success: true,
          data: comprehensiveReport
        };
      } catch (error) {
        logger.error('Comprehensive SEO analysis failed', { error, contentType: input.contentType }, 'SEORouter');
        throw error;
      }
    }),

  /**
   * Get SEO agent status and capabilities
   */
  getAgentStatus: publicProcedure
    .query(async () => {
      try {
        const seoAgent = new SEOAgent();
        const status = await seoAgent.getStatus();
        
        return {
          success: true,
          data: {
            ...status,
            capabilities: seoAgent.getCapabilities(),
            isAIEnabled: Boolean(process.env.OPENAI_API_KEY)
          }
        };
      } catch (error) {
        logger.error('Failed to get SEO agent status', { error }, 'SEORouter');
        throw error;
      }
    }),
}); 