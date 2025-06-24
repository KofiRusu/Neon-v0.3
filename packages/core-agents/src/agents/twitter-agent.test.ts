import { TwitterAgent } from './twitter-agent';
import { AgentPayload } from '../base-agent';

describe('TwitterAgent', () => {
  let agent: TwitterAgent;

  beforeEach(() => {
    agent = new TwitterAgent();
  });

  describe('initialization', () => {
    it('should initialize with correct agent type and capabilities', () => {
      expect(agent.id).toBe('twitter-agent');
      expect(agent.name).toBe('Twitter AI Agent');
      expect(agent.type).toBe('social-twitter');
      
      const capabilities = agent.getCapabilities();
      expect(capabilities).toContain('tweet_generation');
      expect(capabilities).toContain('thread_creation');
      expect(capabilities).toContain('engagement_optimization');
      expect(capabilities).toContain('oauth_management');
    });
  });

  describe('tweet generation', () => {
    it('should generate a tweet with basic parameters', async () => {
      const payload: AgentPayload = {
        task: 'tweet_generation',
        context: {
          topic: 'artificial intelligence',
          tone: 'engaging',
          audience: 'tech professionals'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.generatedTweet).toBeDefined();
      expect(result.data.generatedTweet.text).toBeDefined();
      expect(result.data.generatedTweet.hashtags).toBeDefined();
      expect(result.data.reasoning).toBeDefined();
    });

    it('should respect character limits for tweets', async () => {
      const payload: AgentPayload = {
        task: 'tweet_generation',
        context: {
          topic: 'artificial intelligence and machine learning in modern technology',
          maxLength: 280,
          tone: 'professional'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.generatedTweet.text.length).toBeLessThanOrEqual(280);
      expect(result.data.generatedTweet.estimatedLength).toBeLessThanOrEqual(280);
    });

    it('should generate appropriate hashtags based on topic', async () => {
      const payload: AgentPayload = {
        task: 'tweet_generation',
        context: {
          topic: 'blockchain technology',
          includeHashtags: true,
          audience: 'crypto enthusiasts'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.generatedTweet.hashtags).toBeDefined();
      expect(result.data.generatedTweet.hashtags.length).toBeGreaterThan(0);
      expect(result.data.generatedTweet.hashtags.length).toBeLessThanOrEqual(3);
    });
  });

  describe('thread creation', () => {
    it('should create a thread with multiple parts', async () => {
      const payload: AgentPayload = {
        task: 'thread_creation',
        context: {
          topic: 'startup growth strategies',
          mainPoints: ['product-market fit', 'team building', 'fundraising'],
          tone: 'informative'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.thread).toBeDefined();
      expect(result.data.thread.parts).toBeDefined();
      expect(result.data.thread.totalTweets).toBeGreaterThan(1);
      expect(result.data.thread.structure).toBeDefined();
    });

    it('should optimize thread length automatically', async () => {
      const payload: AgentPayload = {
        task: 'thread_creation',
        context: {
          topic: 'digital marketing',
          threadLength: 'auto',
          includeConclusion: true
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.thread.totalTweets).toBeGreaterThan(2);
      expect(result.data.thread.totalTweets).toBeLessThanOrEqual(10);
    });
  });

  describe('engagement optimization', () => {
    it('should analyze engagement patterns', async () => {
      const payload: AgentPayload = {
        task: 'engagement_optimization',
        context: {
          accountId: 'test-account',
          timeframe: '30d',
          analysisDepth: 'comprehensive'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.currentPerformance).toBeDefined();
      expect(result.data.optimizations).toBeDefined();
      expect(result.data.predictions).toBeDefined();
      expect(result.data.actionPlan).toBeDefined();
    });

    it('should provide actionable recommendations', async () => {
      const payload: AgentPayload = {
        task: 'engagement_optimization',
        context: {
          accountId: 'test-account',
          timeframe: '7d'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.optimizations.immediate).toBeDefined();
      expect(result.data.optimizations.shortTerm).toBeDefined();
      expect(result.data.optimizations.longTerm).toBeDefined();
      expect(Array.isArray(result.data.optimizations.immediate)).toBe(true);
    });
  });

  describe('trend analysis', () => {
    it('should analyze current trends', async () => {
      const payload: AgentPayload = {
        task: 'trend_analysis',
        context: {
          categories: ['tech', 'business'],
          timeframe: '24h',
          region: 'US'
        },
        priority: 'low'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.trends).toBeDefined();
      expect(result.data.opportunities).toBeDefined();
      expect(result.data.predictions).toBeDefined();
    });

    it('should identify emerging trends', async () => {
      const payload: AgentPayload = {
        task: 'trend_analysis',
        context: {
          includeHashtags: true,
          includeTopics: true
        },
        priority: 'low'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.trends.emerging).toBeDefined();
      expect(Array.isArray(result.data.trends.emerging)).toBe(true);
    });
  });

  describe('hashtag research', () => {
    it('should research relevant hashtags', async () => {
      const payload: AgentPayload = {
        task: 'hashtag_research',
        context: {
          topic: 'sustainable technology',
          audience: 'environmentalists',
          maxSuggestions: 10
        },
        priority: 'low'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.research).toBeDefined();
      expect(result.data.recommendations).toBeDefined();
      expect(result.data.recommendations.length).toBeLessThanOrEqual(10);
    });

    it('should provide analytics for hashtags', async () => {
      const payload: AgentPayload = {
        task: 'hashtag_research',
        context: {
          topic: 'fintech',
          includeAnalytics: true
        },
        priority: 'low'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.analytics).toBeDefined();
      expect(result.data.insights).toBeDefined();
    });
  });

  describe('audience insights', () => {
    it('should provide comprehensive audience analysis', async () => {
      const payload: AgentPayload = {
        task: 'audience_insights',
        context: {
          accountId: 'test-account',
          analysisType: 'comprehensive',
          includeGrowthPlan: true
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.audience).toBeDefined();
      expect(result.data.insights).toBeDefined();
      expect(result.data.growth).toBeDefined();
      expect(result.data.recommendations).toBeDefined();
    });
  });

  describe('OAuth management', () => {
    it('should initiate OAuth flow', async () => {
      const payload: AgentPayload = {
        task: 'oauth_management',
        context: {
          action: 'connect',
          accountData: {
            username: 'testuser'
          }
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.authorizationUrl).toBeDefined();
      expect(result.data.state).toBeDefined();
      expect(result.data.codeVerifier).toBeDefined();
    });

    it('should handle account disconnection', async () => {
      const payload: AgentPayload = {
        task: 'oauth_management',
        context: {
          action: 'disconnect',
          accountData: {
            accountId: 'test-account'
          }
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.success).toBe(true);
      expect(result.data.message).toBeDefined();
    });
  });

  describe('content scheduling', () => {
    it('should schedule content successfully', async () => {
      const payload: AgentPayload = {
        task: 'content_scheduling',
        context: {
          content: {
            text: 'Test tweet content',
            hashtags: ['#test']
          },
          scheduledTime: new Date(Date.now() + 3600000) // 1 hour from now
        },
        priority: 'high'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.data.scheduled).toBe(true);
      expect(result.data.postId).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle invalid tasks gracefully', async () => {
      const payload: AgentPayload = {
        task: 'invalid_task',
        context: {},
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Unknown task');
    });

    it('should handle missing required context', async () => {
      const payload: AgentPayload = {
        task: 'engagement_optimization',
        context: {}, // Missing accountId
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('performance', () => {
    it('should complete tasks within reasonable time', async () => {
      const startTime = Date.now();
      
      const payload: AgentPayload = {
        task: 'tweet_generation',
        context: {
          topic: 'performance test',
          tone: 'casual'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);
      const executionTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
      expect(result.performance).toBeDefined();
    });
  });

  describe('agent status', () => {
    it('should return correct status information', async () => {
      const status = await agent.getStatus();

      expect(status.id).toBe('twitter-agent');
      expect(status.name).toBe('Twitter AI Agent');
      expect(status.type).toBe('social-twitter');
      expect(status.status).toBeDefined();
      expect(status.capabilities).toBeDefined();
      expect(status.capabilities.length).toBeGreaterThan(0);
    });
  });

  describe('payload validation', () => {
    it('should validate payloads correctly', () => {
      const validPayload: AgentPayload = {
        task: 'tweet_generation',
        context: { topic: 'test' },
        priority: 'medium'
      };

      const isValid = agent.validatePayload(validPayload);
      expect(isValid).toBe(true);
    });

    it('should reject invalid payloads', () => {
      const invalidPayload = {
        // Missing required task field
        context: { topic: 'test' },
        priority: 'medium'
      } as any;

      const isValid = agent.validatePayload(invalidPayload);
      expect(isValid).toBe(false);
    });
  });
});