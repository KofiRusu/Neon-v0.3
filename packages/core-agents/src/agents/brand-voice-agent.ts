import { AbstractAgent } from '../base-agent';
import type { AgentResult, AgentPayload } from '../base-agent';

export interface BrandVoiceContext {
  action: 'analyze' | 'score' | 'suggest' | 'create_profile' | 'get_guidelines';
  content?: string;
  contentType?: 'email' | 'social' | 'blog' | 'ad' | 'general';
  brandVoiceId?: string;
  profileData?: {
    name: string;
    description?: string;
    guidelines: Record<string, any>;
    keywords: string[];
    toneProfile: Record<string, any>;
    sampleContent?: Record<string, any>;
  };
}

export interface BrandVoiceResult extends AgentResult {
  voiceScore?: number;
  suggestions?: Array<{
    type: 'tone' | 'vocabulary' | 'structure' | 'style';
    issue: string;
    suggestion: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  profile?: any;
  guidelines?: Record<string, any>;
  analysis?: {
    toneAnalysis: Record<string, number>;
    keywordUsage: Record<string, number>;
    sentimentScore: number;
    readabilityScore: number;
    brandAlignment: number;
    wordCount: number;
    characterCount: number;
    contentType: string;
    analysisVersion: string;
  };
}

export class BrandVoiceAgent extends AbstractAgent {
  constructor() {
    super('brand-voice-agent', 'BrandVoiceAgent', 'brand_voice', [
      'analyze_content',
      'score_content',
      'generate_suggestions',
      'create_profile',
      'get_guidelines',
      'update_guidelines'
    ]);
  }

  async execute(payload: AgentPayload): Promise<BrandVoiceResult> {
    return this.executeWithErrorHandling(payload, async () => {
      const context = payload.context as BrandVoiceContext;
      
      if (!context.action) {
        throw new Error('Missing required context: action is required');
      }

      switch (context.action) {
        case 'analyze':
          return await this.analyzeContent(context);
        case 'score':
          return await this.scoreContent(context);
        case 'suggest':
          return await this.generateSuggestions(context);
        case 'create_profile':
          return await this.createBrandProfile(context);
        case 'get_guidelines':
          return await this.getGuidelines(context);
        default:
          throw new Error(`Unknown action: ${context.action}`);
      }
    }) as Promise<BrandVoiceResult>;
  }

  private async analyzeContent(context: BrandVoiceContext): Promise<BrandVoiceResult> {
    if (!context.content) {
      throw new Error('Content is required for analysis');
    }

    const analysis = await this.performContentAnalysis(context.content, context.contentType);
    const voiceScore = await this.calculateVoiceScore(context.content, context.brandVoiceId);
    const suggestions = await this.generateContentSuggestions(context.content, analysis);

    return {
      success: true,
      voiceScore,
      suggestions,
      analysis,
      data: {
        contentAnalyzed: true,
        analysisTimestamp: new Date().toISOString(),
        contentLength: context.content.length,
        contentType: context.contentType || 'general'
      },
      metadata: {
        timestamp: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private async scoreContent(context: BrandVoiceContext): Promise<BrandVoiceResult> {
    if (!context.content) {
      throw new Error('Content is required for scoring');
    }

    const voiceScore = await this.calculateVoiceScore(context.content, context.brandVoiceId);
    const quickAnalysis = await this.performQuickAnalysis(context.content);

    return {
      success: true,
      voiceScore,
      analysis: quickAnalysis,
      data: {
        scoreCalculated: true,
        timestamp: new Date().toISOString()
      },
      metadata: {
        timestamp: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private async generateSuggestions(context: BrandVoiceContext): Promise<BrandVoiceResult> {
    if (!context.content) {
      throw new Error('Content is required for suggestions');
    }

    const analysis = await this.performContentAnalysis(context.content, context.contentType);
    const suggestions = await this.generateContentSuggestions(context.content, analysis);

    return {
      success: true,
      suggestions,
      data: {
        suggestionsGenerated: true,
        suggestionCount: suggestions.length,
        timestamp: new Date().toISOString()
      },
      metadata: {
        timestamp: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private async createBrandProfile(context: BrandVoiceContext): Promise<BrandVoiceResult> {
    if (!context.profileData) {
      throw new Error('Profile data is required');
    }

    // In a real implementation, this would save to database
    const profile = {
      id: `brand-voice-${Date.now()}`,
      ...context.profileData,
      createdAt: new Date().toISOString(),
      version: '1.0',
      isActive: true
    };

    return {
      success: true,
      profile,
      data: {
        profileCreated: true,
        profileId: profile.id,
        timestamp: new Date().toISOString()
      },
      metadata: {
        timestamp: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private async getGuidelines(context: BrandVoiceContext): Promise<BrandVoiceResult> {
    // Mock guidelines - in real implementation, fetch from database
    const guidelines = {
      tone: {
        primary: 'professional',
        secondary: 'friendly',
        avoid: ['overly casual', 'jargon-heavy', 'aggressive']
      },
      vocabulary: {
        preferred: ['innovative', 'efficient', 'solution', 'growth'],
        prohibited: ['cheap', 'basic', 'simple'],
        brandTerms: ['NeonHub', 'AI-powered', 'automation']
      },
      style: {
        sentenceLength: 'medium',
        paragraphLength: 'short-to-medium',
        readingLevel: 'college',
        punctuation: 'standard'
      },
      messaging: {
        valueProposition: 'Empowering businesses through intelligent automation',
        keyMessages: [
          'Transform your marketing with AI',
          'Achieve consistent brand voice',
          'Scale your content creation'
        ]
      }
    };

    return {
      success: true,
      guidelines,
      data: {
        guidelinesRetrieved: true,
        timestamp: new Date().toISOString()
      },
      metadata: {
        timestamp: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private async performContentAnalysis(content: string, contentType?: string): Promise<any> {
    // Tone analysis
    const toneAnalysis = this.analyzeTone(content);
    
    // Keyword analysis
    const keywordUsage = this.analyzeKeywords(content);
    
    // Sentiment analysis
    const sentimentScore = this.analyzeSentiment(content);
    
    // Readability analysis
    const readabilityScore = this.analyzeReadability(content);
    
    // Brand alignment
    const brandAlignment = this.analyzeBrandAlignment(content);

    return {
      toneAnalysis,
      keywordUsage,
      sentimentScore,
      readabilityScore,
      brandAlignment,
      contentType: contentType || 'general',
      wordCount: content.split(/\s+/).length,
      characterCount: content.length,
      analysisVersion: '1.0'
    };
  }

  private async performQuickAnalysis(content: string): Promise<any> {
    return {
      toneAnalysis: this.analyzeTone(content),
      sentimentScore: this.analyzeSentiment(content),
      brandAlignment: this.analyzeBrandAlignment(content),
      wordCount: content.split(/\s+/).length,
      characterCount: content.length,
      readabilityScore: this.analyzeReadability(content),
      keywordUsage: this.analyzeKeywords(content)
    };
  }

  private analyzeTone(content: string): Record<string, number> {
    const contentLower = content.toLowerCase();
    
    // Simple tone detection based on keywords and patterns
    const toneIndicators = {
      professional: ['solution', 'implement', 'strategy', 'optimize', 'efficiency'],
      friendly: ['help', 'easy', 'simple', 'welcome', 'happy'],
      urgent: ['now', 'immediately', 'urgent', 'asap', 'quickly'],
      casual: ['hey', 'awesome', 'cool', 'great', 'nice'],
      formal: ['furthermore', 'therefore', 'consequently', 'nevertheless']
    };

    const toneScores: Record<string, number> = {};
    
    for (const [tone, keywords] of Object.entries(toneIndicators)) {
      const matches = keywords.filter(keyword => contentLower.includes(keyword)).length;
      toneScores[tone] = (matches / keywords.length) * 100;
    }

    return toneScores;
  }

  private analyzeKeywords(content: string): Record<string, number> {
    const brandKeywords = ['neonhub', 'ai', 'automation', 'marketing', 'brand', 'voice'];
    
    const keywordCounts: Record<string, number> = {};
    
    brandKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex) || [];
      keywordCounts[keyword] = matches.length;
    });
    
    return keywordCounts;
  }

  private analyzeSentiment(content: string): number {
    // Simple sentiment analysis based on positive/negative words
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'disappointing', 'poor'];
    
    const contentLower = content.toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      if (contentLower.includes(word)) positiveCount++;
    });
    
    negativeWords.forEach(word => {
      if (contentLower.includes(word)) negativeCount++;
    });
    
    const totalWords = content.split(/\s+/).length;
    const sentimentScore = ((positiveCount - negativeCount) / totalWords) * 100;
    
    // Normalize to 0-100 scale
    return Math.max(0, Math.min(100, 50 + sentimentScore));
  }

  private analyzeReadability(content: string): number {
    // Simple readability score based on sentence and word length
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/);
    
    if (sentences.length === 0) return 50;
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgCharsPerWord = content.replace(/\s+/g, '').length / words.length;
    
    // Higher score for moderate complexity (easier to read)
    let readabilityScore = 100;
    
    if (avgWordsPerSentence > 20) readabilityScore -= 20; // Too long sentences
    if (avgWordsPerSentence < 8) readabilityScore -= 10; // Too short sentences
    if (avgCharsPerWord > 6) readabilityScore -= 15; // Too complex words
    
    return Math.max(0, readabilityScore);
  }

  private analyzeBrandAlignment(content: string): number {
    const contentLower = content.toLowerCase();
    
    // Brand voice characteristics scoring
    let alignmentScore = 0;
    let totalChecks = 0;
    
    // Professional tone check
    const professionalWords = ['solution', 'strategy', 'optimize', 'efficiency', 'professional'];
    const professionalMatches = professionalWords.filter(word => contentLower.includes(word)).length;
    alignmentScore += (professionalMatches / professionalWords.length) * 25;
    totalChecks++;
    
    // Innovation focus check
    const innovationWords = ['innovative', 'cutting-edge', 'advanced', 'smart', 'intelligent'];
    const innovationMatches = innovationWords.filter(word => contentLower.includes(word)).length;
    alignmentScore += (innovationMatches / innovationWords.length) * 25;
    totalChecks++;
    
    // Customer-centric check
    const customerWords = ['you', 'your', 'customer', 'user', 'client'];
    const customerMatches = customerWords.filter(word => contentLower.includes(word)).length;
    alignmentScore += Math.min(25, (customerMatches / content.split(/\s+/).length) * 100);
    totalChecks++;
    
    // Brand terminology check
    const brandTerms = ['neonhub', 'ai-powered', 'automation'];
    const brandMatches = brandTerms.filter(term => contentLower.includes(term)).length;
    alignmentScore += (brandMatches > 0 ? 25 : 0);
    totalChecks++;
    
    return alignmentScore / totalChecks;
  }

  private async calculateVoiceScore(content: string, brandVoiceId?: string): Promise<number> {
    const analysis = await this.performContentAnalysis(content);
    
    // Weight different aspects of voice consistency
    const weights = {
      toneAlignment: 0.3,
      brandAlignment: 0.25,
      readability: 0.2,
      sentiment: 0.15,
      keywordUsage: 0.1
    };
    
    let totalScore = 0;
    totalScore += analysis.brandAlignment * weights.brandAlignment;
    totalScore += analysis.readabilityScore * weights.readability;
    totalScore += analysis.sentimentScore * weights.sentiment;
    
    // Tone alignment (prefer professional tone)
    const toneScore = analysis.toneAnalysis.professional || 0;
    totalScore += toneScore * weights.toneAlignment;
    
    // Keyword usage bonus
    const keywordScore = Object.values(analysis.keywordUsage).reduce((sum: number, count: number) => sum + count, 0) as number;
    totalScore += Math.min(100, keywordScore * 10) * weights.keywordUsage;
    
    return Math.round(totalScore);
  }

  private async generateContentSuggestions(content: string, analysis: any): Promise<Array<any>> {
    const suggestions = [];
    
    // Tone suggestions
    if (analysis.toneAnalysis.professional < 30) {
      suggestions.push({
        type: 'tone',
        issue: 'Content lacks professional tone',
        suggestion: 'Use more professional language like "solution", "strategy", "optimize"',
        priority: 'high'
      });
    }
    
    // Brand alignment suggestions
    if (analysis.brandAlignment < 50) {
      suggestions.push({
        type: 'style',
        issue: 'Low brand alignment score',
        suggestion: 'Include more brand-specific terminology and focus on customer benefits',
        priority: 'high'
      });
    }
    
    // Readability suggestions
    if (analysis.readabilityScore < 60) {
      suggestions.push({
        type: 'structure',
        issue: 'Content may be difficult to read',
        suggestion: 'Use shorter sentences and simpler words for better readability',
        priority: 'medium'
      });
    }
    
    // Keyword suggestions
    const keywordCount = Object.values(analysis.keywordUsage).reduce((sum: number, count: number) => sum + count, 0) as number;
    if (keywordCount === 0) {
      suggestions.push({
        type: 'vocabulary',
        issue: 'No brand keywords detected',
        suggestion: 'Include brand-relevant keywords like "NeonHub", "AI-powered", "automation"',
        priority: 'medium'
      });
    }
    
    // Sentiment suggestions
    if (analysis.sentimentScore < 40) {
      suggestions.push({
        type: 'tone',
        issue: 'Content has negative sentiment',
        suggestion: 'Use more positive language and focus on benefits',
        priority: 'high'
      });
    }
    
    return suggestions;
  }

  // Public methods for external integration
  async analyzeContentPublic(content: string, contentType?: string, brandVoiceId?: string): Promise<BrandVoiceResult> {
    return this.execute({
      task: 'analyze_content',
      context: { action: 'analyze', content, contentType, brandVoiceId },
      priority: 'medium'
    });
  }

  async scoreContentPublic(content: string, brandVoiceId?: string): Promise<BrandVoiceResult> {
    return this.execute({
      task: 'score_content',
      context: { action: 'score', content, brandVoiceId },
      priority: 'medium'
    });
  }

  async getSuggestionsPublic(content: string, contentType?: string): Promise<BrandVoiceResult> {
    return this.execute({
      task: 'generate_suggestions',
      context: { action: 'suggest', content, contentType },
      priority: 'medium'
    });
  }
}