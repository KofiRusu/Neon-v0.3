import { LinkedInAgent } from './linkedin-agent';
import { AgentPayload } from '../base-agent';

describe('LinkedInAgent', () => {
  let agent: LinkedInAgent;

  beforeEach(() => {
    agent = new LinkedInAgent();
  });

  describe('initialization', () => {
    it('should initialize with correct agent type and capabilities', () => {
      expect(agent.id).toBe('linkedin-agent');
      expect(agent.name).toBe('LinkedIn AI Agent');
      expect(agent.type).toBe('social-linkedin');
      
      const capabilities = agent.getCapabilities();
      expect(capabilities).toContain('professional_post_generation');
      expect(capabilities).toContain('article_creation');
      expect(capabilities).toContain('thought_leadership');
      expect(capabilities).toContain('network_optimization');
      expect(capabilities).toContain('lead_generation');
    });
  });

  describe('professional post generation', () => {
    it('should generate professional posts with industry focus', async () => {
      const payload: AgentPayload = {
        task: 'professional_post_generation',
        context: {
          topic: 'digital transformation',
          tone: 'professional',
          audience: 'industry_professionals',
          targetIndustry: 'technology',
          postType: 'post'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.professionalPost).toBeDefined();
      expect(result.data.professionalPost.content).toBeDefined();
      expect(result.data.professionalPost.hashtags).toBeDefined();
      expect(result.data.professionalPost.industryRelevance).toBeDefined();
      expect(result.data.reasoning).toBeDefined();
    });

    it('should respect LinkedIn character limits', async () => {
      const payload: AgentPayload = {
        task: 'professional_post_generation',
        context: {
          topic: 'artificial intelligence in business operations',
          maxLength: 3000,
          tone: 'thought_leadership'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.professionalPost.content.length).toBeLessThanOrEqual(3000);
      expect(result.data.professionalPost.estimatedLength).toBeLessThanOrEqual(3000);
    });

    it('should generate industry-specific hashtags', async () => {
      const payload: AgentPayload = {
        task: 'professional_post_generation',
        context: {
          topic: 'fintech innovations',
          targetIndustry: 'finance',
          includeHashtags: true
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.professionalPost.hashtags).toBeDefined();
      expect(result.data.professionalPost.hashtags.length).toBeGreaterThan(0);
      expect(result.data.professionalPost.hashtags.length).toBeLessThanOrEqual(5);
    });
  });

  describe('article creation', () => {
    it('should create comprehensive professional articles', async () => {
      const payload: AgentPayload = {
        task: 'article_creation',
        context: {
          topic: 'future of remote work',
          targetLength: 1500,
          audience: 'executives',
          industry: 'technology',
          articleType: 'thought_leadership'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.article).toBeDefined();
      expect(result.data.article.title).toBeDefined();
      expect(result.data.article.content).toBeDefined();
      expect(result.data.article.sections).toBeDefined();
      expect(result.data.article.estimatedReadTime).toBeDefined();
      expect(result.data.distribution).toBeDefined();
    });

    it('should include professional insights and CTAs', async () => {
      const payload: AgentPayload = {
        task: 'article_creation',
        context: {
          topic: 'leadership strategies',
          includePersonalExperience: true,
          articleType: 'how_to'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.article.callToAction).toBeDefined();
      expect(result.data.article.keywords).toBeDefined();
      expect(result.data.reasoning.thoughtLeadershipValue).toBeDefined();
    });
  });

  describe('thought leadership', () => {
    it('should build comprehensive thought leadership strategy', async () => {
      const payload: AgentPayload = {
        task: 'thought_leadership',
        context: {
          industry: 'consulting',
          expertise_areas: ['strategy', 'digital transformation', 'change management'],
          contentStrategy: 'consistent_insights',
          timeframe: '90d'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.strategy).toBeDefined();
      expect(result.data.contentCalendar).toBeDefined();
      expect(result.data.opportunities).toBeDefined();
      expect(result.data.keyMetrics).toBeDefined();
      expect(result.data.actionPlan).toBeDefined();
    });

    it('should provide measurable goals and metrics', async () => {
      const payload: AgentPayload = {
        task: 'thought_leadership',
        context: {
          industry: 'healthcare',
          expertise_areas: ['medical technology', 'patient care'],
          timeframe: '180d'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.keyMetrics.targetFollowerGrowth).toBeDefined();
      expect(result.data.keyMetrics.expectedEngagementIncrease).toBeDefined();
      expect(result.data.keyMetrics.thoughtLeadershipScore).toBeDefined();
    });
  });

  describe('industry analysis', () => {
    it('should provide comprehensive industry insights', async () => {
      const payload: AgentPayload = {
        task: 'industry_analysis',
        context: {
          industry: 'artificial intelligence',
          analysisType: 'comprehensive',
          includeCompetitors: true,
          timeframe: '30d'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.industry).toBeDefined();
      expect(result.data.trends).toBeDefined();
      expect(result.data.competitive).toBeDefined();
      expect(result.data.opportunities).toBeDefined();
      expect(result.data.insights).toBeDefined();
    });

    it('should identify content gaps and opportunities', async () => {
      const payload: AgentPayload = {
        task: 'industry_analysis',
        context: {
          industry: 'renewable energy',
          analysisType: 'competitive'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.opportunities.contentGaps).toBeDefined();
      expect(result.data.opportunities.networkingOpportunities).toBeDefined();
      expect(result.data.opportunities.partnershipPotential).toBeDefined();
    });
  });

  describe('network optimization', () => {
    it('should analyze and optimize professional networks', async () => {
      const payload: AgentPayload = {
        task: 'network_optimization',
        context: {
          accountId: 'test-linkedin-account',
          optimizationGoals: ['quality_connections', 'industry_reach'],
          targetIndustries: ['technology', 'consulting'],
          connectionStrategy: 'strategic'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.currentNetwork).toBeDefined();
      expect(result.data.optimization).toBeDefined();
      expect(result.data.targets).toBeDefined();
      expect(result.data.metrics).toBeDefined();
      expect(result.data.actionPlan).toBeDefined();
    });

    it('should provide network quality metrics', async () => {
      const payload: AgentPayload = {
        task: 'network_optimization',
        context: {
          accountId: 'test-account',
          optimizationGoals: ['thought_leadership']
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.metrics.qualityScore).toBeDefined();
      expect(result.data.metrics.industryDiversity).toBeDefined();
      expect(result.data.metrics.influenceScore).toBeDefined();
    });
  });

  describe('lead generation', () => {
    it('should create comprehensive lead generation strategy', async () => {
      const payload: AgentPayload = {
        task: 'lead_generation',
        context: {
          targetAudience: {
            jobTitles: ['CEO', 'CTO', 'VP Engineering'],
            industries: ['technology', 'finance'],
            companySizes: ['100-500', '500-1000']
          },
          industry: 'software development',
          leadType: 'professional_services',
          contentStrategy: 'value_first'
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.strategy).toBeDefined();
      expect(result.data.leadMagnets).toBeDefined();
      expect(result.data.outreach).toBeDefined();
      expect(result.data.targeting).toBeDefined();
      expect(result.data.metrics).toBeDefined();
    });

    it('should provide lead conversion estimates', async () => {
      const payload: AgentPayload = {
        task: 'lead_generation',
        context: {
          targetAudience: { jobTitles: ['Director'] },
          industry: 'consulting',
          leadType: 'consulting',
          budget: 'organic'
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.metrics.expectedLeadRate).toBeDefined();
      expect(result.data.metrics.timeToFirstLead).toBeDefined();
      expect(result.data.metrics.costPerLead).toBeDefined();
    });
  });

  describe('content scheduling', () => {
    it('should schedule professional content with targeting', async () => {
      const payload: AgentPayload = {
        task: 'content_scheduling',
        context: {
          content: {
            text: 'Professional insights on digital transformation...',
            postType: 'post'
          },
          scheduledTime: new Date(Date.now() + 3600000),
          targeting: {
            industries: ['technology'],
            jobTitles: ['Manager', 'Director']
          }
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.scheduled).toBe(true);
      expect(result.data.postId).toBeDefined();
    });
  });

  describe('engagement automation', () => {
    it('should configure professional engagement rules', async () => {
      const payload: AgentPayload = {
        task: 'engagement_automation',
        context: {
          accountId: 'test-account',
          settings: {
            autoLike: true,
            autoComment: false,
            autoConnect: true,
            dailyLimits: {
              likes: 20,
              comments: 10,
              connections: 5
            }
          }
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.commentsProcessed).toBeDefined();
      expect(result.data.connectionsManaged).toBeDefined();
      expect(result.data.automationActive).toBe(true);
    });
  });

  describe('company page management', () => {
    it('should manage company page content and analytics', async () => {
      const payload: AgentPayload = {
        task: 'company_page_management',
        context: {
          companyId: 'test-company',
          actions: ['schedule_posts', 'analyze_performance'],
          content: {
            posts: [{
              text: 'Company update about our latest innovation...',
              scheduledTime: new Date(Date.now() + 3600000)
            }]
          }
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.pageUpdated).toBe(true);
      expect(result.data.postsScheduled).toBeDefined();
      expect(result.data.analyticsGenerated).toBe(true);
    });
  });

  describe('professional polling', () => {
    it('should create targeted professional polls', async () => {
      const payload: AgentPayload = {
        task: 'professional_polling',
        context: {
          question: 'What is the biggest challenge in digital transformation?',
          options: ['Technology adoption', 'Change management', 'Budget constraints', 'Skill gaps'],
          duration: '1w',
          targetAudience: {
            industries: ['technology', 'consulting'],
            jobTitles: ['Director', 'VP', 'C-Level']
          }
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.poll).toBeDefined();
      expect(result.data.poll.question).toBeDefined();
      expect(result.data.poll.options).toBeDefined();
      expect(result.data.poll.estimatedParticipants).toBeDefined();
    });
  });

  describe('connection management', () => {
    it('should manage professional connections strategically', async () => {
      const payload: AgentPayload = {
        task: 'connection_management',
        context: {
          accountId: 'test-account',
          action: 'send_requests',
          criteria: {
            targetIndustries: ['technology'],
            jobTitles: ['Engineer', 'Manager'],
            companySizes: ['100-500']
          },
          limits: {
            dailyRequests: 10,
            weeklyRequests: 50
          }
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.pendingRequests).toBeDefined();
      expect(result.data.newConnections).toBeDefined();
      expect(result.data.qualityScore).toBeDefined();
    });
  });

  describe('OAuth management', () => {
    it('should handle LinkedIn OAuth flow', async () => {
      const payload: AgentPayload = {
        task: 'oauth_management',
        context: {
          action: 'connect',
          accountData: {
            redirectUri: 'https://example.com/callback',
            scope: ['r_liteprofile', 'w_member_social']
          }
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.authorizationUrl).toBeDefined();
      expect(result.data.state).toBeDefined();
      expect(result.data.expiresIn).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle invalid tasks gracefully', async () => {
      const payload: AgentPayload = {
        task: 'invalid_linkedin_task',
        context: {},
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Unknown task');
    });

    it('should handle missing account ID for network operations', async () => {
      const payload: AgentPayload = {
        task: 'network_optimization',
        context: {}, // Missing accountId
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Account not found');
    });
  });

  describe('performance and quality', () => {
    it('should complete professional tasks efficiently', async () => {
      const startTime = Date.now();
      
      const payload: AgentPayload = {
        task: 'professional_post_generation',
        context: {
          topic: 'performance test',
          tone: 'professional',
          targetIndustry: 'technology'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);
      const executionTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(executionTime).toBeLessThan(5000);
      expect(result.performance).toBeDefined();
    });

    it('should maintain professional quality standards', async () => {
      const payload: AgentPayload = {
        task: 'article_creation',
        context: {
          topic: 'enterprise software adoption',
          audience: 'executives',
          articleType: 'thought_leadership'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.article.title).toMatch(/enterprise|software|leadership/i);
      expect(result.data.reasoning.thoughtLeadershipValue).toBeDefined();
    });
  });

  describe('agent status and validation', () => {
    it('should return correct LinkedIn agent status', async () => {
      const status = await agent.getStatus();

      expect(status.id).toBe('linkedin-agent');
      expect(status.name).toBe('LinkedIn AI Agent');
      expect(status.type).toBe('social-linkedin');
      expect(status.capabilities).toContain('professional_post_generation');
      expect(status.capabilities).toContain('thought_leadership');
      expect(status.capabilities).toContain('lead_generation');
    });

    it('should validate professional payloads correctly', () => {
      const validPayload: AgentPayload = {
        task: 'professional_post_generation',
        context: { 
          topic: 'test',
          targetIndustry: 'technology'
        },
        priority: 'medium'
      };

      const isValid = agent.validatePayload(validPayload);
      expect(isValid).toBe(true);
    });
  });
});