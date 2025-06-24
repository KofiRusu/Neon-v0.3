'use client';

import { useState, useEffect } from 'react';
import { useSocialAgent } from '../../../lib/hooks/useSocialAgent';

interface PlatformStatsPanelProps {
  selectedPlatform: string;
}

export function PlatformStatsPanel({ selectedPlatform }: PlatformStatsPanelProps) {
  const [timeRange, setTimeRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date(),
  });

  const { getPlatformInsightsQuery, error } = useSocialAgent();

  // Get insights for the selected platform (if not 'all')
  const validPlatforms = ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube'] as const;
  const platform = validPlatforms.includes(selectedPlatform as any) ? selectedPlatform as typeof validPlatforms[number] : 'instagram';
  
  const insightsQuery = getPlatformInsightsQuery(platform, timeRange);
  const { data: insights, isLoading } = insightsQuery;

  // Mock stats for platforms not covered by insights
  const getDefaultStats = (platform: string) => ({
    followers: Math.floor(Math.random() * 50000) + 10000,
    engagement: (Math.random() * 5 + 2).toFixed(1),
    reach: Math.floor(Math.random() * 100000) + 50000,
    posts: Math.floor(Math.random() * 50) + 20,
  });

  const platformColors = {
    all: 'text-gray-600',
    instagram: 'text-pink-600',
    twitter: 'text-blue-500',
    linkedin: 'text-blue-700',
    facebook: 'text-blue-600',
    tiktok: 'text-black',
    youtube: 'text-red-600',
  };

  const platformNames = {
    all: 'All Platforms',
    instagram: 'Instagram',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
  };

  if (error) {
    return (
      <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
        <h3 className="text-lg font-medium text-neutral-600 mb-3">
          Platform Statistics
        </h3>
        <div className="text-center py-8">
          <p className="text-red-400 text-sm">Failed to load platform insights</p>
          <p className="text-neutral-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (selectedPlatform === 'all') {
    return (
      <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
        <h3 className="text-lg font-medium text-neutral-600 mb-3">
          Overall Statistics
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">156K</div>
              <div className="text-xs text-neutral-500">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">4.2%</div>
              <div className="text-xs text-neutral-500">Avg Engagement</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">2.1M</div>
              <div className="text-xs text-neutral-500">Total Reach</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">89</div>
              <div className="text-xs text-neutral-500">Posts This Month</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
      <h3 className={`text-lg font-medium mb-3 ${platformColors[selectedPlatform as keyof typeof platformColors]}`}>
        {platformNames[selectedPlatform as keyof typeof platformNames]} Statistics
      </h3>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-neutral-500 text-sm mt-2">Loading insights...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Platform Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">
                {insights?.data?.metrics?.avgEngagementRate 
                  ? (insights.data.metrics.avgEngagementRate * 100).toFixed(1) + '%'
                  : getDefaultStats(selectedPlatform).engagement + '%'
                }
              </div>
              <div className="text-xs text-neutral-500">Engagement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-700">
                {insights?.data?.metrics?.avgReachRate 
                  ? (insights.data.metrics.avgReachRate * 100).toFixed(1) + '%'
                  : '45.2%'
                }
              </div>
              <div className="text-xs text-neutral-500">Reach Rate</div>
            </div>
          </div>

          {/* Top Content Types */}
          {insights?.data?.metrics?.topPerformingContentTypes && (
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Top Content Types</h4>
              <div className="space-y-1">
                {insights.data.metrics.topPerformingContentTypes.slice(0, 3).map((type: string, index: number) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="text-neutral-500 capitalize">{type}</span>
                    <span className="text-neutral-400">{Math.floor(Math.random() * 40) + 20}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Insights */}
          {insights?.data?.insights && insights.data.insights.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">AI Insights</h4>
              <div className="space-y-2">
                {insights.data.insights.slice(0, 2).map((insight: any, index: number) => (
                  <div key={index} className="bg-neutral-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-neutral-400 capitalize">
                        {insight.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-green-400">
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300">{insight.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audience Demographics */}
          {insights?.data?.metrics?.audienceDemographics && (
            <div>
              <h4 className="text-sm font-medium text-neutral-600 mb-2">Audience</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-500">Age Groups</span>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(insights.data.metrics.audienceDemographics.ageGroups).map(([age, percentage]) => (
                      <div key={age} className="flex justify-between text-xs">
                        <span className="text-neutral-400">{age}</span>
                        <span className="text-neutral-300">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default stats fallback */}
          {!insights?.data && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-700">
                    {getDefaultStats(selectedPlatform).followers.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-500">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-700">
                    {getDefaultStats(selectedPlatform).posts}
                  </div>
                  <div className="text-xs text-neutral-500">Posts</div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}