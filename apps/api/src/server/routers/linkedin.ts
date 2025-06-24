import { LinkedInAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const linkedinRouter = createTRPCRouter({
  generateProfessionalPost: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      tone: z.enum(['professional', 'thought_leadership', 'casual', 'industry_expert']).default('professional'),
      audience: z.enum(['industry_professionals', 'executives', 'entrepreneurs', 'consultants']).default('industry_professionals'),
      includeHashtags: z.boolean().default(true),
      maxLength: z.number().min(1).max(3000).default(3000),
      postType: z.enum(['post', 'article', 'poll', 'event', 'newsletter']).default('post'),
      targetIndustry: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'professional_post_generation',
        context: input,
        priority: 'medium'
      });
    }),

  createArticle: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      targetLength: z.number().min(500).max(5000).default(1500),
      audience: z.enum(['industry_professionals', 'executives', 'entrepreneurs', 'consultants']).default('industry_professionals'),
      includePersonalExperience: z.boolean().default(true),
      industry: z.string().optional(),
      articleType: z.enum(['thought_leadership', 'how_to', 'case_study', 'industry_analysis']).default('thought_leadership')
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'article_creation',
        context: input,
        priority: 'medium'
      });
    }),

  buildThoughtLeadership: publicProcedure
    .input(z.object({
      industry: z.string().min(1, 'Industry is required'),
      expertise_areas: z.array(z.string()).min(1, 'At least one expertise area is required'),
      contentStrategy: z.enum(['consistent_insights', 'trend_analysis', 'experience_sharing']).default('consistent_insights'),
      timeframe: z.enum(['30d', '60d', '90d', '180d']).default('90d')
    }))
    .query(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'thought_leadership',
        context: input,
        priority: 'medium'
      });
    }),

  analyzeIndustry: publicProcedure
    .input(z.object({
      industry: z.string().min(1, 'Industry is required'),
      analysisType: z.enum(['basic', 'comprehensive', 'competitive']).default('comprehensive'),
      includeCompetitors: z.boolean().default(true),
      timeframe: z.enum(['7d', '30d', '90d', '1y']).default('30d')
    }))
    .query(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'industry_analysis',
        context: input,
        priority: 'medium'
      });
    }),

  optimizeNetwork: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      optimizationGoals: z.array(z.enum(['quality_connections', 'industry_reach', 'thought_leadership', 'lead_generation'])).default(['quality_connections', 'industry_reach']),
      targetIndustries: z.array(z.string()).default([]),
      connectionStrategy: z.enum(['strategic', 'aggressive', 'passive']).default('strategic')
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'network_optimization',
        context: input,
        priority: 'medium'
      });
    }),

  generateLeads: publicProcedure
    .input(z.object({
      targetAudience: z.object({
        jobTitles: z.array(z.string()).optional(),
        industries: z.array(z.string()).optional(),
        companySizes: z.array(z.string()).optional(),
        locations: z.array(z.string()).optional()
      }),
      industry: z.string().min(1, 'Industry is required'),
      leadType: z.enum(['professional_services', 'consulting', 'technology', 'sales']).default('professional_services'),
      contentStrategy: z.enum(['value_first', 'direct_outreach', 'content_marketing']).default('value_first'),
      budget: z.enum(['organic', 'paid', 'mixed']).default('organic')
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'lead_generation',
        context: input,
        priority: 'high'
      });
    }),

  scheduleContent: publicProcedure
    .input(z.object({
      content: z.object({
        text: z.string().min(1, 'Content text is required'),
        media: z.array(z.object({
          type: z.enum(['image', 'video', 'document', 'carousel']),
          url: z.string().url(),
          title: z.string().optional(),
          description: z.string().optional()
        })).optional(),
        hashtags: z.array(z.string()).optional(),
        postType: z.enum(['post', 'article', 'poll']).default('post')
      }),
      scheduledTime: z.date(),
      timezone: z.string().default('UTC'),
      targeting: z.object({
        industries: z.array(z.string()).optional(),
        jobTitles: z.array(z.string()).optional(),
        locations: z.array(z.string()).optional(),
        companySizes: z.array(z.string()).optional()
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'content_scheduling',
        context: input,
        priority: 'high'
      });
    }),

  automateEngagement: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      settings: z.object({
        autoLike: z.boolean().default(false),
        autoComment: z.boolean().default(false),
        autoConnect: z.boolean().default(false),
        engagementRules: z.object({
          keywords: z.array(z.string()).optional(),
          industries: z.array(z.string()).optional(),
          connectionCriteria: z.object({
            jobTitles: z.array(z.string()).optional(),
            companySizes: z.array(z.string()).optional(),
            mutualConnections: z.number().optional()
          }).optional()
        }).optional(),
        dailyLimits: z.object({
          likes: z.number().min(0).max(100).default(20),
          comments: z.number().min(0).max(50).default(10),
          connections: z.number().min(0).max(30).default(5)
        }).optional()
      })
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'engagement_automation',
        context: input,
        priority: 'medium'
      });
    }),

  manageCompanyPage: publicProcedure
    .input(z.object({
      companyId: z.string().min(1, 'Company ID is required'),
      actions: z.array(z.enum(['update_info', 'schedule_posts', 'analyze_performance', 'manage_followers'])).default(['schedule_posts', 'analyze_performance']),
      content: z.object({
        posts: z.array(z.object({
          text: z.string(),
          media: z.array(z.object({
            type: z.enum(['image', 'video', 'document']),
            url: z.string().url()
          })).optional(),
          scheduledTime: z.date().optional()
        })).optional(),
        updates: z.object({
          description: z.string().optional(),
          specialties: z.array(z.string()).optional(),
          website: z.string().url().optional()
        }).optional()
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'company_page_management',
        context: input,
        priority: 'medium'
      });
    }),

  createProfessionalPoll: publicProcedure
    .input(z.object({
      question: z.string().min(1, 'Question is required'),
      options: z.array(z.string()).min(2).max(4),
      duration: z.enum(['1d', '3d', '1w', '2w']).default('1w'),
      targetAudience: z.object({
        industries: z.array(z.string()).optional(),
        jobTitles: z.array(z.string()).optional(),
        experienceLevels: z.array(z.enum(['entry', 'mid', 'senior', 'executive'])).optional()
      }).optional(),
      context: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'professional_polling',
        context: input,
        priority: 'medium'
      });
    }),

  manageConnections: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      action: z.enum(['analyze_network', 'send_requests', 'manage_pending', 'nurture_existing']),
      criteria: z.object({
        targetIndustries: z.array(z.string()).optional(),
        jobTitles: z.array(z.string()).optional(),
        companySizes: z.array(z.string()).optional(),
        locations: z.array(z.string()).optional(),
        mutualConnections: z.number().optional()
      }).optional(),
      limits: z.object({
        dailyRequests: z.number().min(0).max(30).default(10),
        weeklyRequests: z.number().min(0).max(100).default(50)
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'connection_management',
        context: input,
        priority: 'medium'
      });
    }),

  manageOAuth: publicProcedure
    .input(z.object({
      action: z.enum(['connect', 'refresh', 'disconnect']),
      accountData: z.object({
        accountId: z.string().optional(),
        authCode: z.string().optional(),
        redirectUri: z.string().url().optional(),
        scope: z.array(z.string()).optional()
      }).optional()
    }))
    .mutation(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'oauth_management',
        context: input,
        priority: 'high'
      });
    }),

  getProfileAnalytics: publicProcedure
    .input(z.object({
      accountId: z.string().min(1, 'Account ID is required'),
      timeframe: z.enum(['7d', '30d', '90d', '1y']).default('30d'),
      metrics: z.array(z.enum(['profile_views', 'post_impressions', 'engagement_rate', 'connection_growth', 'search_appearances'])).default(['profile_views', 'post_impressions', 'engagement_rate'])
    }))
    .query(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      
      // Use network optimization to get comprehensive analytics
      return await linkedinAgent.execute({
        task: 'network_optimization',
        context: {
          accountId: input.accountId,
          optimizationGoals: ['quality_connections'],
          analytics: {
            timeframe: input.timeframe,
            metrics: input.metrics
          }
        },
        priority: 'medium'
      });
    }),

  getContentRecommendations: publicProcedure
    .input(z.object({
      industry: z.string().min(1, 'Industry is required'),
      audience: z.enum(['industry_professionals', 'executives', 'entrepreneurs', 'consultants']).default('industry_professionals'),
      contentTypes: z.array(z.enum(['post', 'article', 'poll', 'carousel'])).default(['post', 'article']),
      topics: z.array(z.string()).optional(),
      count: z.number().min(1).max(20).default(5)
    }))
    .query(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      
      const recommendations = [];
      for (let i = 0; i < input.count; i++) {
        const contentType = input.contentTypes[i % input.contentTypes.length];
        const topic = input.topics?.[i % (input.topics?.length || 1)] || `${input.industry} trends ${i + 1}`;
        
        const task = contentType === 'article' ? 'article_creation' : 'professional_post_generation';
        
        const result = await linkedinAgent.execute({
          task,
          context: {
            topic,
            industry: input.industry,
            audience: input.audience,
            postType: contentType
          },
          priority: 'low'
        });
        
        recommendations.push({
          id: `recommendation_${i + 1}`,
          topic,
          contentType,
          recommendation: result.data?.professionalPost || result.data?.article || { content: `Generated ${contentType} for ${topic}` },
          industry: input.industry,
          audience: input.audience
        });
      }
      
      return {
        success: true,
        data: {
          recommendations,
          totalCount: recommendations.length,
          industry: input.industry,
          audience: input.audience,
          contentTypes: input.contentTypes
        }
      };
    }),

  getIndustryInsights: publicProcedure
    .input(z.object({
      industry: z.string().min(1, 'Industry is required'),
      analysisDepth: z.enum(['overview', 'detailed', 'comprehensive']).default('detailed'),
      includeCompetitors: z.boolean().default(true),
      includeTrends: z.boolean().default(true),
      includeOpportunities: z.boolean().default(true)
    }))
    .query(async ({ input }) => {
      const linkedinAgent = new LinkedInAgent();
      return await linkedinAgent.execute({
        task: 'industry_analysis',
        context: {
          industry: input.industry,
          analysisType: input.analysisDepth,
          includeCompetitors: input.includeCompetitors,
          includeTrends: input.includeTrends,
          includeOpportunities: input.includeOpportunities
        },
        priority: 'medium'
      });
    })
});