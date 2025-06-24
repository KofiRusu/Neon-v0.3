import { TwitterAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const twitterRouter = createTRPCRouter({
  generateTweet: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      tone: z.enum(['engaging', 'professional', 'casual', 'humorous', 'informative']).default('engaging'),
      audience: z.string().default('general'),
      includeHashtags: z.boolean().default(true),
      maxLength: z.number().min(1).max(280).default(280),
      includeEmojis: z.boolean().default(true),
      targetEngagement: z.enum(['low', 'moderate', 'high']).default('moderate')
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'tweet_generation',
        context: input,
        priority: 'medium'
      });
    }),

  createThread: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      mainPoints: z.array(z.string()).default([]),
      tone: z.enum(['engaging', 'professional', 'casual', 'humorous', 'informative']).default('informative'),
      audience: z.string().default('general'),
      threadLength: z.union([z.string(), z.number()]).default('auto'),
      includeConclusion: z.boolean().default(true)
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'thread_creation',
        context: input,
        priority: 'medium'
      });
    }),

  optimizeEngagement: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      timeframe: z.string().default('30d'),
      contentTypes: z.array(z.string()).default(['tweets', 'replies', 'retweets']),
      analysisDepth: z.enum(['basic', 'comprehensive', 'advanced']).default('comprehensive')
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'engagement_optimization',
        context: input,
        priority: 'medium'
      });
    }),

  analyzeTrends: publicProcedure
    .input(z.object({
      categories: z.array(z.string()).default(['general', 'tech', 'business']),
      timeframe: z.string().default('24h'),
      region: z.string().default('US'),
      includeHashtags: z.boolean().default(true),
      includeTopics: z.boolean().default(true)
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'trend_analysis',
        context: input,
        priority: 'low'
      });
    }),

  getAudienceInsights: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      analysisType: z.enum(['basic', 'comprehensive', 'advanced']).default('comprehensive'),
      includeGrowthPlan: z.boolean().default(true)
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'audience_insights',
        context: input,
        priority: 'medium'
      });
    }),

  researchHashtags: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      audience: z.string().default('general'),
      includeAnalytics: z.boolean().default(true),
      maxSuggestions: z.number().min(1).max(50).default(15)
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'hashtag_research',
        context: input,
        priority: 'low'
      });
    }),

  scheduleContent: publicProcedure
    .input(z.object({
      content: z.object({
        text: z.string().min(1).max(280),
        media: z.array(z.object({
          type: z.enum(['image', 'video', 'gif']),
          url: z.string().url(),
          altText: z.string().optional()
        })).optional(),
        hashtags: z.array(z.string()).optional()
      }),
      scheduledTime: z.date(),
      timezone: z.string().default('UTC'),
      autoOptimize: z.boolean().default(true)
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'content_scheduling',
        context: input,
        priority: 'high'
      });
    }),

  automateReplies: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      settings: z.object({
        autoReplyEnabled: z.boolean().default(false),
        replyTone: z.enum(['professional', 'friendly', 'casual']).default('friendly'),
        responseTime: z.enum(['immediate', '5min', '15min', '1h']).default('15min'),
        keywords: z.array(z.string()).optional(),
        blacklist: z.array(z.string()).optional()
      })
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'reply_automation',
        context: input,
        priority: 'medium'
      });
    }),

  manageDMs: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      action: z.enum(['process_inbox', 'auto_respond', 'categorize', 'archive']),
      settings: z.object({
        autoResponse: z.boolean().default(false),
        categories: z.array(z.string()).default(['business', 'personal', 'spam']),
        responseTemplates: z.record(z.string()).optional()
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'dm_management',
        context: input,
        priority: 'medium'
      });
    }),

  analyzeSpaces: publicProcedure
    .input(z.object({
      spaceId: z.string().optional(),
      analysis: z.object({
        includeTranscript: z.boolean().default(false),
        analyzeEngagement: z.boolean().default(true),
        extractInsights: z.boolean().default(true),
        generateSummary: z.boolean().default(true)
      }).optional()
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'twitter_spaces_analysis',
        context: input,
        priority: 'low'
      });
    }),

  manageOAuth: publicProcedure
    .input(z.object({
      action: z.enum(['connect', 'refresh', 'disconnect']),
      accountData: z.object({
        accountId: z.string().optional(),
        username: z.string().optional(),
        authCode: z.string().optional(),
        redirectUri: z.string().url().optional()
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      return await twitterAgent.execute({
        task: 'oauth_management',
        context: input,
        priority: 'high'
      });
    }),

  getAccountMetrics: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      timeframe: z.string().default('30d'),
      metrics: z.array(z.enum(['followers', 'engagement', 'reach', 'impressions'])).default(['followers', 'engagement'])
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      
      // Use existing functionality for comprehensive metrics
      return await twitterAgent.execute({
        task: 'engagement_optimization',
        context: {
          accountId: input.accountId,
          timeframe: input.timeframe,
          metrics: input.metrics
        },
        priority: 'medium'
      });
    }),

  bulkSchedule: publicProcedure
    .input(z.object({
      posts: z.array(z.object({
        text: z.string().min(1).max(280),
        hashtags: z.array(z.string()).optional(),
        media: z.array(z.object({
          type: z.enum(['image', 'video', 'gif']),
          url: z.string().url(),
          altText: z.string().optional()
        })).optional()
      })).min(1, 'At least one post is required'),
      schedule: z.object({
        startDate: z.date(),
        frequency: z.enum(['daily', 'hourly', 'weekly', 'custom']).default('daily'),
        timezone: z.string().default('UTC'),
        optimalTiming: z.boolean().default(true)
      })
    }))
    .mutation(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      
      // Transform input for the agent's bulk scheduling
      const context = {
        posts: input.posts,
        platforms: ['twitter'],
        startDate: input.schedule.startDate.toISOString(),
        frequency: input.schedule.frequency,
        timezone: input.schedule.timezone
      };

      return await twitterAgent.execute({
        task: 'content_scheduling',
        context,
        priority: 'high'
      });
    }),

  getContentSuggestions: publicProcedure
    .input(z.object({
      industry: z.string().optional(),
      topics: z.array(z.string()).default([]),
      contentType: z.enum(['tweet', 'thread', 'poll', 'reply']).default('tweet'),
      count: z.number().min(1).max(20).default(5)
    }))
    .query(async ({ input }) => {
      const twitterAgent = new TwitterAgent();
      
      const suggestions = [];
      for (let i = 0; i < input.count; i++) {
        const topic = input.topics[i % input.topics.length] || `trending topic ${i + 1}`;
        
        const result = await twitterAgent.execute({
          task: 'tweet_generation',
          context: {
            topic,
            tone: 'engaging',
            audience: input.industry || 'general',
            targetEngagement: 'moderate'
          },
          priority: 'low'
        });
        
        suggestions.push({
          id: `suggestion_${i + 1}`,
          topic,
          contentType: input.contentType,
          suggestion: result.data?.generatedTweet || { text: `Generated content for ${topic}` }
        });
      }
      
      return {
        success: true,
        data: {
          suggestions,
          totalCount: suggestions.length,
          industry: input.industry,
          contentType: input.contentType
        }
      };
    })
});