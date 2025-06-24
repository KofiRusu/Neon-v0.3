'use client';

import React, { useState } from 'react';
import { trpc } from '../../lib/trpc';

export default function SEOPage() {
  // Meta Tag Generator State
  const [metaContent, setMetaContent] = useState('');
  const [metaTargetKeywords, setMetaTargetKeywords] = useState('');
  const [metaContentType, setMetaContentType] = useState<'blog' | 'page' | 'product' | 'article'>('blog');
  const [metaResults, setMetaResults] = useState<{title: string; description: string; slug?: string} | null>(null);

  // Keyword Analyzer State
  const [keywordContent, setKeywordContent] = useState('');
  const [keywordsToAnalyze, setKeywordsToAnalyze] = useState('');
  const [keywordResults, setKeywordResults] = useState<any[] | null>(null);

  // Technical SEO Audit State
  const [auditContent, setAuditContent] = useState('');
  const [auditContentType, setAuditContentType] = useState<'html' | 'markdown'>('markdown');
  const [auditResults, setAuditResults] = useState<any | null>(null);

  // tRPC Mutations
  const generateMetaTags = trpc.seo.generateMetaTags.useMutation({
    onSuccess: (data: {title: string; description: string; slug?: string}) => {
      setMetaResults(data);
      // Show success toast
      console.log('Meta tags generated successfully');
    },
    onError: (error: any) => {
      console.error('Error generating meta tags:', error);
    }
  });

  const analyzeKeywords = trpc.seo.analyzeKeywords.useMutation({
    onSuccess: (data: any[]) => {
      setKeywordResults(data);
      console.log('Keywords analyzed successfully');
    },
    onError: (error: any) => {
      console.error('Error analyzing keywords:', error);
    }
  });

  const auditTechnicalSEO = trpc.seo.auditTechnicalSEO.useMutation({
    onSuccess: (data: any) => {
      setAuditResults(data);
      console.log('Technical audit completed successfully');
    },
    onError: (error: any) => {
      console.error('Error performing technical audit:', error);
    }
  });

  // Helper functions
  const handleMetaTagGeneration = () => {
    if (!metaContent.trim() || !metaTargetKeywords.trim()) return;
    
    const keywords = metaTargetKeywords.split(',').map((k: string) => k.trim()).filter((k: string) => k);
    generateMetaTags.mutate({
      content: metaContent,
      targetKeywords: keywords,
      contentType: metaContentType
    });
  };

  const handleKeywordAnalysis = () => {
    if (!keywordContent.trim() || !keywordsToAnalyze.trim()) return;
    
    const keywords = keywordsToAnalyze.split(',').map((k: string) => k.trim()).filter((k: string) => k);
    analyzeKeywords.mutate({
      content: keywordContent,
      keywords
    });
  };

  const handleTechnicalAudit = () => {
    if (!auditContent.trim()) return;
    
    auditTechnicalSEO.mutate({
      content: auditContent,
      contentType: auditContentType
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard');
  };

  const getStatusColor = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return 'text-green-400';
      case 'fail': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-neutral-400';
    }
  };

  const getIntentColor = (keyword: any) => {
    if (keyword.competitiveness === 'low') return 'bg-green-500/20 text-green-400';
    if (keyword.competitiveness === 'medium') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-700 mb-2">
          SEO Optimizer Panel
        </h1>
        <p className="text-neutral-600">
          Generate meta tags, analyze keywords, and audit technical SEO
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8">
        
        {/* 1. Meta Tag Generator Panel */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-700">
              Meta Tag Generator
            </h2>
            {generateMetaTags.isLoading && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-neon-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-neon-400 text-sm">Generating...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Content/Topic
                </label>
                <textarea
                  value={metaContent}
                  onChange={(e) => setMetaContent(e.target.value)}
                  placeholder="Enter your content or describe the topic..."
                  className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 placeholder-neutral-500 focus:border-neon-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Target Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={metaTargetKeywords}
                  onChange={(e) => setMetaTargetKeywords(e.target.value)}
                  placeholder="SEO optimization, content marketing, digital strategy"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 placeholder-neutral-500 focus:border-neon-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Content Type
                </label>
                <select
                  value={metaContentType}
                  onChange={(e) => setMetaContentType(e.target.value as any)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 focus:border-neon-400 focus:outline-none"
                >
                  <option value="blog">Blog Post</option>
                  <option value="page">Landing Page</option>
                  <option value="product">Product Page</option>
                  <option value="article">Article</option>
                </select>
              </div>

              <button
                onClick={handleMetaTagGeneration}
                disabled={generateMetaTags.isLoading || !metaContent.trim() || !metaTargetKeywords.trim()}
                className="w-full bg-neon-400 hover:bg-neon-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-dark-900 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Generate Meta Tags
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {metaResults ? (
                <>
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-600">Title Tag</h4>
                      <button
                        onClick={() => copyToClipboard(metaResults.title)}
                        className="text-neon-400 hover:text-neon-500 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-neutral-300 text-sm">{metaResults.title}</p>
                    <p className="text-neutral-500 text-xs mt-1">{metaResults.title.length} characters</p>
                  </div>

                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-600">Meta Description</h4>
                      <button
                        onClick={() => copyToClipboard(metaResults.description)}
                        className="text-neon-400 hover:text-neon-500 text-sm"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-neutral-300 text-sm">{metaResults.description}</p>
                    <p className="text-neutral-500 text-xs mt-1">{metaResults.description.length} characters</p>
                  </div>

                  {metaResults.slug && (
                    <div className="bg-neutral-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-600">Suggested URL Slug</h4>
                        <button
                          onClick={() => copyToClipboard(metaResults.slug!)}
                          className="text-neon-400 hover:text-neon-500 text-sm"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-neutral-300 text-sm font-mono">{metaResults.slug}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-neutral-800 rounded-lg p-8 text-center">
                  <p className="text-neutral-500">Generated meta tags will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2. Keyword Analyzer Panel */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-700">
              Keyword Analyzer
            </h2>
            {analyzeKeywords.isLoading && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-neon-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-neon-400 text-sm">Analyzing...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Content to Analyze
                </label>
                <textarea
                  value={keywordContent}
                  onChange={(e) => setKeywordContent(e.target.value)}
                  placeholder="Paste your blog post or article content here..."
                  className="w-full h-40 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 placeholder-neutral-500 focus:border-neon-400 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Keywords to Analyze (comma-separated)
                </label>
                <input
                  type="text"
                  value={keywordsToAnalyze}
                  onChange={(e) => setKeywordsToAnalyze(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 placeholder-neutral-500 focus:border-neon-400 focus:outline-none"
                />
              </div>

              <button
                onClick={handleKeywordAnalysis}
                disabled={analyzeKeywords.isLoading || !keywordContent.trim() || !keywordsToAnalyze.trim()}
                className="w-full bg-neon-400 hover:bg-neon-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-dark-900 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Analyze Keywords
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {keywordResults && keywordResults.length > 0 ? (
                <div className="space-y-3">
                  {keywordResults.map((keyword, index) => (
                    <div key={index} className="bg-neutral-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-300">{keyword.keyword}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${getIntentColor(keyword)}`}>
                          {keyword.competitiveness}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-neutral-500">Frequency</p>
                          <p className="text-neon-400 font-semibold">{keyword.frequency}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Density</p>
                          <p className="text-neon-400 font-semibold">{keyword.density.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Position</p>
                          <p className="text-neutral-300 capitalize">{keyword.position}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs">
                        <span className="text-neutral-500">Search Volume: </span>
                        <span className="text-neutral-400 capitalize">{keyword.searchVolume}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-neutral-800 rounded-lg p-8 text-center">
                  <p className="text-neutral-500">Keyword analysis results will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Technical SEO Audit Panel */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-700">
              Technical SEO Audit
            </h2>
            {auditTechnicalSEO.isLoading && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-neon-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-neon-400 text-sm">Auditing...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Content Type
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setAuditContentType('markdown')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      auditContentType === 'markdown'
                        ? 'bg-neon-400 text-dark-900'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    onClick={() => setAuditContentType('html')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      auditContentType === 'html'
                        ? 'bg-neon-400 text-dark-900'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    HTML
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-2">
                  Content to Audit
                </label>
                <textarea
                  value={auditContent}
                  onChange={(e) => setAuditContent(e.target.value)}
                  placeholder={auditContentType === 'html' 
                    ? "Paste your HTML content here..." 
                    : "Paste your markdown content here..."
                  }
                  className="w-full h-48 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-neutral-300 placeholder-neutral-500 focus:border-neon-400 focus:outline-none resize-none font-mono text-sm"
                />
              </div>

              <button
                onClick={handleTechnicalAudit}
                disabled={auditTechnicalSEO.isLoading || !auditContent.trim()}
                className="w-full bg-neon-400 hover:bg-neon-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-dark-900 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Run Technical Audit
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {auditResults ? (
                <>
                  {/* Score */}
                  <div className="bg-neutral-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-600">SEO Score</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 relative">
                          <svg className="transform -rotate-90 w-12 h-12">
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              className="text-neutral-700"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 18}`}
                              strokeDashoffset={`${2 * Math.PI * 18 * (1 - auditResults.score / 100)}`}
                              className={
                                auditResults.score >= 80 ? 'text-green-400' :
                                auditResults.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                              }
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-semibold text-neutral-300">
                              {auditResults.score}
                            </span>
                          </div>
                        </div>
                        <span className={`text-lg font-bold ${
                          auditResults.score >= 80 ? 'text-green-400' :
                          auditResults.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {auditResults.score}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checks */}
                  <div className="space-y-3">
                    {auditResults.checks.map((check: any, index: number) => (
                      <div key={index} className="bg-neutral-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-neutral-300">{check.name}</h5>
                          <span className={`text-sm ${getStatusColor(check.status)}`}>
                            {check.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-sm mb-2">{check.message}</p>
                        {check.recommendation && (
                          <p className="text-neon-400 text-xs">{check.recommendation}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Improvements */}
                  {auditResults.improvements.length > 0 && (
                    <div className="bg-neutral-800 rounded-lg p-4">
                      <h4 className="font-medium text-neutral-600 mb-3">Improvement Tips</h4>
                      <ul className="space-y-2">
                        {auditResults.improvements.map((improvement: string, index: number) => (
                          <li key={index} className="text-neutral-400 text-sm flex items-start">
                            <span className="text-neon-400 mr-2">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-neutral-800 rounded-lg p-8 text-center">
                  <p className="text-neutral-500">Technical audit results will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}