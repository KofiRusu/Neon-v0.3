import { AbstractAgent } from '../base-agent';
import type { AgentResult, AgentPayload } from '../base-agent';

export interface SEOOptimizationContext {
  content: string;
  targetKeywords: string[];
  title?: string;
  description?: string;
  url?: string;
  contentType: 'blog' | 'page' | 'product' | 'article';
  focusKeyword?: string;
}

export interface SEOAnalysisResult extends AgentResult {
  seoScore: number;
  optimizedContent: string;
  suggestions: SEOSuggestion[];
  keywords: KeywordAnalysis[];
  meta: {
    optimizedTitle: string;
    optimizedDescription: string;
    suggestedUrl?: string;
  };
}

export interface SEOSuggestion {
  type: 'title' | 'meta' | 'content' | 'keywords' | 'structure' | 'url';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  currentValue?: string;
  suggestedValue?: string;
}

export interface KeywordAnalysis {
  keyword: string;
  density: number;
  frequency: number;
  position: 'title' | 'meta' | 'content' | 'headers' | 'none';
  competitiveness: 'low' | 'medium' | 'high';
  searchVolume: 'low' | 'medium' | 'high';
}

export class SEOAgent extends AbstractAgent {
  constructor() {
    super('seo-agent', 'SEOAgent', 'seo', [
      'optimize_keywords',
      'analyze_content',
      'generate_meta_tags'
    ]);
  }

  async execute(payload: AgentPayload): Promise<AgentResult> {
    return this.executeWithErrorHandling(payload, async () => {
      const context = payload.context as SEOOptimizationContext;
      
      // Validate input
      if (!context.content || !context.targetKeywords || context.targetKeywords.length === 0) {
        throw new Error('Missing required context: content and targetKeywords are required');
      }

      // Perform SEO analysis and optimization
      const result = await this.optimizeForSEO(context);
      
      return result;
    });
  }

  private async optimizeForSEO(context: SEOOptimizationContext): Promise<SEOAnalysisResult> {
    // Analyze current content
    const keywords = this.analyzeKeywords(context.content, context.targetKeywords);
    const suggestions = this.generateSEOSuggestions(context, keywords);
    const optimizedContent = this.optimizeContent(context);
    const meta = this.optimizeMetadata(context);
    const seoScore = this.calculateSEOScore(context, keywords, suggestions);

    return {
      seoScore,
      optimizedContent,
      suggestions,
      keywords,
      meta,
      success: true
    };
  }

  private analyzeKeywords(content: string, targetKeywords: string[]): KeywordAnalysis[] {
    const contentLower = content.toLowerCase();
    const wordCount = content.split(/\s+/).length;

    return targetKeywords.map(keyword => {
      const keywordLower = keyword.toLowerCase();
      const frequency = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
      const density = (frequency / wordCount) * 100;
      
      // Check keyword position
      let position: KeywordAnalysis['position'] = 'none';
      if (contentLower.includes(keywordLower)) {
        if (contentLower.indexOf(keywordLower) < 100) position = 'title';
        else if (content.includes('#') && content.split('#').some(section => 
          section.toLowerCase().includes(keywordLower))) position = 'headers';
        else position = 'content';
      }

      return {
        keyword,
        density,
        frequency,
        position,
        competitiveness: this.estimateCompetitiveness(keyword),
        searchVolume: this.estimateSearchVolume(keyword)
      };
    });
  }

  private estimateCompetitiveness(keyword: string): 'low' | 'medium' | 'high' {
    // Simple heuristic based on keyword characteristics
    const words = keyword.split(' ');
    if (words.length >= 3) return 'low'; // Long-tail keywords
    if (words.length === 2) return 'medium';
    return 'high'; // Single-word keywords
  }

  private estimateSearchVolume(keyword: string): 'low' | 'medium' | 'high' {
    // Simple heuristic - in real implementation, would use Google Keyword Planner API
    const commonWords = ['marketing', 'business', 'online', 'digital', 'strategy', 'tips'];
    const hasCommonWord = commonWords.some(word => keyword.toLowerCase().includes(word));
    
    if (hasCommonWord) return 'high';
    if (keyword.split(' ').length <= 2) return 'medium';
    return 'low';
  }

  private generateSEOSuggestions(
    context: SEOOptimizationContext, 
    keywords: KeywordAnalysis[]
  ): SEOSuggestion[] {
    const suggestions: SEOSuggestion[] = [];
    const { content, title, description, focusKeyword } = context;

    // Title optimization
    if (!title || title.length < 30) {
      suggestions.push({
        type: 'title',
        severity: 'high',
        message: 'Title is too short or missing. Aim for 50-60 characters.',
        currentValue: title || 'No title',
        suggestedValue: this.generateOptimalTitle(context, keywords)
      });
    }

    // Meta description optimization
    if (!description || description.length < 120) {
      suggestions.push({
        type: 'meta',
        severity: 'high',
        message: 'Meta description is too short or missing. Aim for 150-160 characters.',
        currentValue: description || 'No description',
        suggestedValue: this.generateOptimalDescription(context, keywords)
      });
    }

    // Keyword density analysis
    keywords.forEach(keyword => {
      if (keyword.density < 0.5) {
        suggestions.push({
          type: 'keywords',
          severity: 'medium',
          message: `Keyword "${keyword.keyword}" density is too low (${keyword.density.toFixed(1)}%). Consider including it more naturally.`,
          currentValue: `${keyword.density.toFixed(1)}%`,
          suggestedValue: '1-2%'
        });
      } else if (keyword.density > 3) {
        suggestions.push({
          type: 'keywords',
          severity: 'high',
          message: `Keyword "${keyword.keyword}" density is too high (${keyword.density.toFixed(1)}%). This may be seen as keyword stuffing.`,
          currentValue: `${keyword.density.toFixed(1)}%`,
          suggestedValue: '1-2%'
        });
      }
    });

    // Content structure analysis
    if (!content.includes('#')) {
      suggestions.push({
        type: 'structure',
        severity: 'medium',
        message: 'Content lacks headers. Use H1, H2, H3 tags to improve structure and SEO.',
        suggestedValue: 'Add meaningful headers with target keywords'
      });
    }

    // Focus keyword in title
    if (focusKeyword && title && !title.toLowerCase().includes(focusKeyword.toLowerCase())) {
      suggestions.push({
        type: 'title',
        severity: 'high',
        message: `Focus keyword "${focusKeyword}" not found in title.`,
        currentValue: title,
        suggestedValue: `Include "${focusKeyword}" in title`
      });
    }

    // Content length
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      suggestions.push({
        type: 'content',
        severity: 'medium',
        message: `Content is too short (${wordCount} words). Aim for at least 300 words for better SEO.`,
        currentValue: `${wordCount} words`,
        suggestedValue: '300+ words'
      });
    }

    return suggestions;
  }

  private optimizeContent(context: SEOOptimizationContext): string {
    let optimizedContent = context.content;
    const { targetKeywords, focusKeyword } = context;

    // Ensure focus keyword appears in first paragraph
    if (focusKeyword && !optimizedContent.substring(0, 200).toLowerCase().includes(focusKeyword.toLowerCase())) {
      const firstParagraph = optimizedContent.split('\n\n')[0];
      if (firstParagraph) {
        const optimizedFirstParagraph = `${firstParagraph} Understanding ${focusKeyword} is crucial for success.`;
        optimizedContent = optimizedContent.replace(firstParagraph, optimizedFirstParagraph);
      }
    }

    // Add internal linking suggestions (placeholder)
    if (!optimizedContent.includes('[') && !optimizedContent.includes('(')) {
      optimizedContent += '\n\n*Internal linking opportunities: Consider linking to related content about ' + 
                          targetKeywords.slice(0, 2).join(', ') + '.*';
    }

    return optimizedContent;
  }

  private optimizeMetadata(context: SEOOptimizationContext) {
    const { title, focusKeyword, targetKeywords, contentType } = context;
    
    return {
      optimizedTitle: this.generateOptimalTitle(context, this.analyzeKeywords(context.content, targetKeywords)),
      optimizedDescription: this.generateOptimalDescription(context, this.analyzeKeywords(context.content, targetKeywords)),
      suggestedUrl: this.generateSEOFriendlyUrl(title || focusKeyword || targetKeywords[0] || 'content', contentType)
    };
  }

  private generateOptimalTitle(context: SEOOptimizationContext, keywords: KeywordAnalysis[]): string {
    const { title, focusKeyword, contentType } = context;
    const highPriorityKeyword = focusKeyword || keywords[0]?.keyword || 'Guide';
    
    if (title && title.length >= 30 && title.length <= 60) {
      return title; // Already optimal
    }

    const titleTemplates = {
      blog: `The Complete Guide to ${highPriorityKeyword} | Expert Tips`,
      page: `${highPriorityKeyword} Solutions | Professional Services`,
      product: `Best ${highPriorityKeyword} | Premium Quality`,
      article: `${highPriorityKeyword}: Everything You Need to Know`
    };

    const generatedTitle = titleTemplates[contentType] || titleTemplates.article;
    
    // Ensure it's within optimal length
    return generatedTitle.length <= 60 ? generatedTitle : generatedTitle.substring(0, 57) + '...';
  }

  private generateOptimalDescription(context: SEOOptimizationContext, keywords: KeywordAnalysis[]): string {
    const { description, focusKeyword, targetKeywords } = context;
    const primaryKeyword = focusKeyword || keywords[0]?.keyword || 'solution';
    const secondaryKeywords = targetKeywords.slice(0, 2).join(', ');
    
    if (description && description.length >= 120 && description.length <= 160) {
      return description; // Already optimal
    }

    const metaDescription = `Discover comprehensive ${primaryKeyword} strategies and tips. ` +
                           `Learn about ${secondaryKeywords} with our expert guidance. ` +
                           `Get actionable insights and proven results.`;
    
    // Ensure it's within optimal length
    return metaDescription.length <= 160 ? metaDescription : metaDescription.substring(0, 157) + '...';
  }

  private generateSEOFriendlyUrl(title: string, contentType: string): string {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    const typePrefix = {
      blog: 'blog',
      page: '',
      product: 'products',
      article: 'articles'
    };

    const prefix = typePrefix[contentType as keyof typeof typePrefix] || '';
    return prefix ? `/${prefix}/${baseSlug}` : `/${baseSlug}`;
  }

  private calculateSEOScore(
    context: SEOOptimizationContext, 
    keywords: KeywordAnalysis[], 
    suggestions: SEOSuggestion[]
  ): number {
    let score = 100;
    const { content, title, description } = context;

    // Deduct points for critical issues
    suggestions.forEach(suggestion => {
      switch (suggestion.severity) {
        case 'critical':
          score -= 25;
          break;
        case 'high':
          score -= 15;
          break;
        case 'medium':
          score -= 10;
          break;
        case 'low':
          score -= 5;
          break;
      }
    });

    // Bonus points for good practices
    if (title && title.length >= 30 && title.length <= 60) score += 10;
    if (description && description.length >= 120 && description.length <= 160) score += 10;
    if (content.includes('#')) score += 5; // Has headers
    if (content.split(/\s+/).length >= 300) score += 10; // Good length
    
    // Keyword optimization bonus
    const wellOptimizedKeywords = keywords.filter(k => k.density >= 0.5 && k.density <= 2.5);
    score += wellOptimizedKeywords.length * 5;

    return Math.max(0, Math.min(100, score));
  }

  // Public methods for Phase 1 integration
  async optimizeKeywords(context: SEOOptimizationContext): Promise<AgentResult> {
    return this.execute({ 
      task: 'optimize_keywords',
      context,
      priority: 'medium'
    });
  }

  async analyzeContent(content: string, keywords: string[]): Promise<KeywordAnalysis[]> {
    return this.analyzeKeywords(content, keywords);
  }

  async generateMetaTags(context: SEOOptimizationContext): Promise<{title: string; description: string; slug?: string}> {
    const meta = this.optimizeMetadata(context);
    
    return {
      title: meta.optimizedTitle,
      description: meta.optimizedDescription,
      slug: meta.suggestedUrl
    };
  }

  async auditTechnicalSEO(content: string, contentType: 'html' | 'markdown' = 'markdown'): Promise<{
    score: number;
    checks: Array<{
      name: string;
      status: 'pass' | 'fail' | 'warning';
      message: string;
      recommendation?: string;
    }>;
    improvements: string[];
  }> {
    const checks = [];
    let score = 100;
    const improvements = [];

    // H1 tag check
    const h1Check = this.checkH1Tags(content, contentType);
    checks.push(h1Check);
    if (h1Check.status === 'fail') score -= 20;
    if (h1Check.status === 'warning') score -= 10;

    // Alt text check
    const altTextCheck = this.checkAltText(content, contentType);
    checks.push(altTextCheck);
    if (altTextCheck.status === 'fail') score -= 15;

    // Heading structure check
    const headingStructureCheck = this.checkHeadingStructure(content, contentType);
    checks.push(headingStructureCheck);
    if (headingStructureCheck.status === 'fail') score -= 15;
    if (headingStructureCheck.status === 'warning') score -= 5;

    // Content readability
    const readabilityCheck = this.checkReadability(content);
    checks.push(readabilityCheck);
    if (readabilityCheck.status === 'warning') score -= 10;

    // Generate improvements
    checks.forEach(check => {
      if (check.recommendation && check.status !== 'pass') {
        improvements.push(check.recommendation);
      }
    });

    return {
      score: Math.max(0, score),
      checks,
      improvements
    };
  }

  private checkH1Tags(content: string, contentType: 'html' | 'markdown'): {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    recommendation?: string;
  } {
    let h1Count = 0;
    
    if (contentType === 'html') {
      const h1Matches = content.match(/<h1[^>]*>/gi);
      h1Count = h1Matches ? h1Matches.length : 0;
    } else {
      const h1Matches = content.match(/^# [^\n]+/gm);
      h1Count = h1Matches ? h1Matches.length : 0;
    }

    if (h1Count === 0) {
      return {
        name: 'H1 Tag',
        status: 'fail',
        message: 'No H1 tag found',
        recommendation: 'Add exactly one H1 tag to clearly define the main topic of your content'
      };
    } else if (h1Count > 1) {
      return {
        name: 'H1 Tag',
        status: 'warning',
        message: `Multiple H1 tags found (${h1Count})`,
        recommendation: 'Use only one H1 tag per page and use H2-H6 for subheadings'
      };
    } else {
      return {
        name: 'H1 Tag',
        status: 'pass',
        message: 'Proper H1 tag usage'
      };
    }
  }

  private checkAltText(content: string, contentType: 'html' | 'markdown'): {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    recommendation?: string;
  } {
    let imageCount = 0;
    let imagesWithAlt = 0;

    if (contentType === 'html') {
      const imgMatches = content.match(/<img[^>]*>/gi);
      imageCount = imgMatches ? imgMatches.length : 0;
      
      if (imgMatches) {
        imagesWithAlt = imgMatches.filter(img => 
          img.includes('alt=') && !img.match(/alt=["']?\s*["']?/)
        ).length;
      }
    } else {
      const imgMatches = content.match(/!\[[^\]]*\]\([^)]+\)/g);
      imageCount = imgMatches ? imgMatches.length : 0;
      
      if (imgMatches) {
        imagesWithAlt = imgMatches.filter(img => {
          const altMatch = img.match(/!\[([^\]]*)\]/);
          return altMatch && altMatch[1].trim().length > 0;
        }).length;
      }
    }

    if (imageCount === 0) {
      return {
        name: 'Alt Text',
        status: 'pass',
        message: 'No images found'
      };
    }

    const missingAlt = imageCount - imagesWithAlt;
    if (missingAlt > 0) {
      return {
        name: 'Alt Text',
        status: 'fail',
        message: `${missingAlt} image(s) missing alt text`,
        recommendation: 'Add descriptive alt text to all images for better accessibility and SEO'
      };
    } else {
      return {
        name: 'Alt Text',
        status: 'pass',
        message: 'All images have alt text'
      };
    }
  }

  private checkHeadingStructure(content: string, contentType: 'html' | 'markdown'): {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    recommendation?: string;
  } {
    let headings: number[] = [];

    if (contentType === 'html') {
      const headingMatches = content.match(/<h([1-6])[^>]*>/gi);
      if (headingMatches) {
        headings = headingMatches.map(h => parseInt(h.match(/h([1-6])/i)?.[1] || '1'));
      }
    } else {
      const headingMatches = content.match(/^#{1,6} [^\n]+/gm);
      if (headingMatches) {
        headings = headingMatches.map(h => h.match(/^#{1,6}/)?.[0].length || 1);
      }
    }

    if (headings.length === 0) {
      return {
        name: 'Heading Structure',
        status: 'fail',
        message: 'No headings found',
        recommendation: 'Use headings (H1-H6) to structure your content hierarchically'
      };
    }

    // Check for proper hierarchy
    let hasProperHierarchy = true;
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i-1] + 1) {
        hasProperHierarchy = false;
        break;
      }
    }

    if (!hasProperHierarchy) {
      return {
        name: 'Heading Structure',
        status: 'warning',
        message: 'Heading hierarchy could be improved',
        recommendation: 'Follow proper heading hierarchy (H1 > H2 > H3, etc.) without skipping levels'
      };
    } else {
      return {
        name: 'Heading Structure',
        status: 'pass',
        message: 'Proper heading hierarchy'
      };
    }
  }

  private checkReadability(content: string): {
    name: string;
    status: 'pass' | 'fail' | 'warning';
    message: string;
    recommendation?: string;
  } {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    
    const avgWordsPerSentence = words.length / sentences.length;
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const avgSentencesPerParagraph = sentences.length / paragraphs.length;

    if (avgWordsPerSentence > 25 || avgSentencesPerParagraph > 7) {
      return {
        name: 'Readability',
        status: 'warning',
        message: 'Content may be difficult to read',
        recommendation: 'Consider shorter sentences and paragraphs for better readability'
      };
    } else {
      return {
        name: 'Readability',
        status: 'pass',
        message: 'Good readability'
      };
    }
  }
} 