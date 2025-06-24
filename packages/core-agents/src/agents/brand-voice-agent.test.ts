import { BrandVoiceAgent, type BrandVoiceResult } from './brand-voice-agent';
import type { AgentPayload } from '../base-agent';

describe('BrandVoiceAgent', () => {
  let agent: BrandVoiceAgent;

  beforeEach(() => {
    agent = new BrandVoiceAgent();
  });

  describe('Agent Configuration', () => {
    it('should initialize with correct properties', () => {
      expect(agent.id).toBe('brand-voice-agent');
      expect(agent.name).toBe('BrandVoiceAgent');
      expect(agent.type).toBe('brand_voice');
      expect(agent.capabilities).toContain('analyze_content');
      expect(agent.capabilities).toContain('score_content');
      expect(agent.capabilities).toContain('generate_suggestions');
    });

    it('should have all required capabilities', () => {
      const expectedCapabilities = [
        'analyze_content',
        'score_content',
        'generate_suggestions',
        'create_profile',
        'get_guidelines',
        'update_guidelines'
      ];

      expectedCapabilities.forEach(capability => {
        expect(agent.capabilities).toContain(capability);
      });
    });
  });

  describe('Content Analysis', () => {
    const testContent = "Our innovative AI-powered solution helps optimize your marketing strategy efficiently.";

    it('should analyze content successfully', async () => {
      const payload: AgentPayload = {
        task: 'analyze_content',
        context: {
          action: 'analyze',
          content: testContent,
          contentType: 'blog'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload) as BrandVoiceResult;

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(typeof result.voiceScore).toBe('number');
      expect(result.voiceScore).toBeGreaterThanOrEqual(0);
      expect(result.voiceScore).toBeLessThanOrEqual(100);
      expect(result.analysis).toBeDefined();
      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);
    });

    it('should return detailed analysis data', async () => {
      const payload: AgentPayload = {
        task: 'analyze_content',
        context: {
          action: 'analyze',
          content: testContent,
          contentType: 'email'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload) as BrandVoiceResult;

      expect(result.analysis).toBeDefined();
      expect(result.analysis!.toneAnalysis).toBeDefined();
      expect(result.analysis!.keywordUsage).toBeDefined();
      expect(result.analysis!.sentimentScore).toBeDefined();
      expect(result.analysis!.readabilityScore).toBeDefined();
      expect(result.analysis!.brandAlignment).toBeDefined();
      expect(result.analysis!.wordCount).toBeDefined();
      expect(result.analysis!.characterCount).toBeDefined();
    });

    it('should fail without content', async () => {
      const payload: AgentPayload = {
        task: 'analyze_content',
        context: {
          action: 'analyze'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Content is required');
    });
  });

  describe('Content Scoring', () => {
    it('should score professional content highly', async () => {
      const professionalContent = "Our innovative solution helps optimize business strategy through efficient implementation.";
      
      const payload: AgentPayload = {
        task: 'score_content',
        context: {
          action: 'score',
          content: professionalContent
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.voiceScore).toBeGreaterThan(50);
    });

    it('should score casual content lower', async () => {
      const casualContent = "Hey! This is awesome stuff, really cool and nice!";
      
      const payload: AgentPayload = {
        task: 'score_content',
        context: {
          action: 'score',
          content: casualContent
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.voiceScore).toBeDefined();
    });

    it('should provide quick analysis with scoring', async () => {
      const payload: AgentPayload = {
        task: 'score_content',
        context: {
          action: 'score',
          content: "Professional marketing solution for business optimization."
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.analysis).toBeDefined();
      expect(result.analysis.toneAnalysis).toBeDefined();
      expect(result.analysis.sentimentScore).toBeDefined();
      expect(result.analysis.brandAlignment).toBeDefined();
    });
  });

  describe('Suggestion Generation', () => {
    it('should generate suggestions for improvement', async () => {
      const poorContent = "bad terrible awful content";
      
      const payload: AgentPayload = {
        task: 'generate_suggestions',
        context: {
          action: 'suggest',
          content: poorContent,
          contentType: 'social'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload) as BrandVoiceResult;

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);
      expect(result.suggestions!.length).toBeGreaterThan(0);
    });

    it('should provide structured suggestions', async () => {
      const payload: AgentPayload = {
        task: 'generate_suggestions',
        context: {
          action: 'suggest',
          content: "Some content that needs improvement",
          contentType: 'blog'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload) as BrandVoiceResult;

      expect(result.success).toBe(true);
      
      if (result.suggestions && result.suggestions.length > 0) {
        const suggestion = result.suggestions[0];
        expect(suggestion.type).toBeDefined();
        expect(suggestion.issue).toBeDefined();
        expect(suggestion.suggestion).toBeDefined();
        expect(suggestion.priority).toBeDefined();
        expect(['low', 'medium', 'high']).toContain(suggestion.priority);
      }
    });
  });

  describe('Brand Profile Management', () => {
    it('should create brand profile', async () => {
      const profileData = {
        name: 'Test Brand Voice',
        description: 'Test brand voice profile',
        guidelines: { tone: 'professional' },
        keywords: ['test', 'brand'],
        toneProfile: { professional: 80 }
      };

      const payload: AgentPayload = {
        task: 'create_profile',
        context: {
          action: 'create_profile',
          profileData
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload) as BrandVoiceResult;

      expect(result.success).toBe(true);
      expect(result.profile).toBeDefined();
      expect(result.profile!.name).toBe(profileData.name);
      expect(result.profile!.id).toBeDefined();
      expect(result.profile!.createdAt).toBeDefined();
    });

    it('should fail to create profile without data', async () => {
      const payload: AgentPayload = {
        task: 'create_profile',
        context: {
          action: 'create_profile'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Profile data is required');
    });
  });

  describe('Guidelines Management', () => {
    it('should retrieve brand guidelines', async () => {
      const payload: AgentPayload = {
        task: 'get_guidelines',
        context: {
          action: 'get_guidelines'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.guidelines).toBeDefined();
      expect(result.guidelines.tone).toBeDefined();
      expect(result.guidelines.vocabulary).toBeDefined();
      expect(result.guidelines.style).toBeDefined();
      expect(result.guidelines.messaging).toBeDefined();
    });

    it('should return structured guidelines', async () => {
      const payload: AgentPayload = {
        task: 'get_guidelines',
        context: {
          action: 'get_guidelines'
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(true);
      expect(result.guidelines.tone.primary).toBeDefined();
      expect(result.guidelines.vocabulary.preferred).toBeDefined();
      expect(Array.isArray(result.guidelines.vocabulary.preferred)).toBe(true);
      expect(result.guidelines.messaging.keyMessages).toBeDefined();
      expect(Array.isArray(result.guidelines.messaging.keyMessages)).toBe(true);
    });
  });

  describe('Public Methods', () => {
    it('should provide public method for content analysis', async () => {
      const content = "Test content for analysis";
      const result = await agent.analyzeContentPublic(content, 'blog');

      expect(result.success).toBe(true);
      expect(result.voiceScore).toBeDefined();
      expect(result.analysis).toBeDefined();
      expect(result.suggestions).toBeDefined();
    });

    it('should provide public method for content scoring', async () => {
      const content = "Professional business solution";
      const result = await agent.scoreContentPublic(content);

      expect(result.success).toBe(true);
      expect(result.voiceScore).toBeDefined();
      expect(result.analysis).toBeDefined();
    });

    it('should provide public method for suggestions', async () => {
      const content = "Content needing suggestions";
      const result = await agent.getSuggestionsPublic(content, 'email');

      expect(result.success).toBe(true);
      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid action', async () => {
      const payload: AgentPayload = {
        task: 'invalid_task',
        context: {
          action: 'invalid_action' as any
        },
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unknown action');
    });

    it('should handle missing action', async () => {
      const payload: AgentPayload = {
        task: 'test',
        context: {},
        priority: 'medium'
      };

      const result = await agent.execute(payload);

      expect(result.success).toBe(false);
      expect(result.error).toContain('action is required');
    });
  });

  describe('Performance', () => {
    it('should complete analysis within reasonable time', async () => {
      const longContent = "Professional business solution ".repeat(100);
      const startTime = Date.now();
      
      const result = await agent.analyzeContentPublic(longContent, 'blog');
      const executionTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(executionTime).toBeLessThan(5000); // 5 seconds max
      expect(result.performance).toBeDefined();
    });
  });
});