import { useState } from 'react';
import { trpc } from '../trpc';

export interface SocialPostData {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';
  content: {
    text: string;
    media?: Array<{
      type: 'image' | 'video' | 'gif';
      url: string;
      altText?: string;
    }>;
    hashtags?: string[];
    mentions?: string[];
    link?: string;
  };
  scheduling: {
    publishNow?: boolean;
    scheduledAt?: Date;
    timezone?: string;
  };
  settings: {
    enableComments?: boolean;
    crossPost?: string[];
    locationTag?: string;
    audienceTargeting?: {
      demographics?: string[];
      interests?: string[];
      locations?: string[];
    };
  };
}

export interface CrossPlatformPostData {
  baseContent: {
    text: string;
    media?: Array<{
      type: 'image' | 'video' | 'gif';
      url: string;
      altText?: string;
    }>;
    hashtags?: string[];
    mentions?: string[];
    link?: string;
  };
  platforms: string[];
  customizations: Record<string, any>;
}

export interface ContentCalendarData {
  startDate: Date;
  endDate: Date;
  platforms: string[];
  contentTypes: string[];
  postFrequency: Array<{
    platform: string;
    postsPerDay: number;
    optimalTimes: string[];
  }>;
  themes?: string[];
  campaigns?: string[];
}

export interface SocialListeningData {
  keywords: string[];
  mentions: string[];
  hashtags: string[];
  competitors?: string[];
  platforms: string[];
  sentiment?: 'positive' | 'negative' | 'neutral' | 'all';
  timeRange: {
    start: Date;
    end: Date;
  };
}

export const useSocialAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutations
  const schedulePostMutation = trpc.social.schedulePost.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const publishPostMutation = trpc.social.publishPost.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const crossPlatformPostMutation = trpc.social.crossPlatformPost.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const manageContentCalendarMutation = trpc.social.manageContentCalendar.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  const optimizeContentMutation = trpc.social.optimizeContent.useMutation({
    onMutate: () => {
      setIsLoading(true);
      setError(null);
    },
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  // tRPC queries
  const getPostAnalyticsQuery = (postId: string, platform: string) =>
    trpc.social.getPostAnalytics.useQuery(
      { postId, platform },
      { enabled: !!postId && !!platform }
    );

  const getPlatformInsightsQuery = (platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube', timeRange: { start: Date; end: Date }) =>
    trpc.social.getPlatformInsights.useQuery({ platform, timeRange });

  const performSocialListeningQuery = (listeningData: SocialListeningData) =>
    trpc.social.performSocialListening.useQuery(listeningData);

  // Action functions
  const schedulePost = async (postData: SocialPostData) => {
    try {
      const result = await schedulePostMutation.mutateAsync(postData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const publishPost = async (postData: SocialPostData) => {
    try {
      const result = await publishPostMutation.mutateAsync(postData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const createCrossPlatformPost = async (postData: CrossPlatformPostData) => {
    try {
      const result = await crossPlatformPostMutation.mutateAsync(postData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const manageContentCalendar = async (calendarData: ContentCalendarData) => {
    try {
      const result = await manageContentCalendarMutation.mutateAsync(calendarData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const optimizeContent = async (contentData: {
    content: any;
    platform: string;
    audience: any;
    goals: any;
  }) => {
    try {
      const result = await optimizeContentMutation.mutateAsync(contentData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    // Actions
    schedulePost,
    publishPost,
    createCrossPlatformPost,
    manageContentCalendar,
    optimizeContent,
    clearError,
    getPostAnalyticsQuery,
    getPlatformInsightsQuery,
    performSocialListeningQuery,
    
    // States
    isLoading,
    error,
    
    // Mutation states
    isSchedulingPost: schedulePostMutation.isLoading,
    isPublishingPost: publishPostMutation.isLoading,
    isCrossPlatformPosting: crossPlatformPostMutation.isLoading,
    isManagingCalendar: manageContentCalendarMutation.isLoading,
    isOptimizingContent: optimizeContentMutation.isLoading,
  };
};