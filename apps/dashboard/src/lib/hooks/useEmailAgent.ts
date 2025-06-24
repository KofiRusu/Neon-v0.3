import { useState } from 'react';
import { trpc } from '../trpc';

export interface EmailCampaignData {
  name: string;
  subject: string;
  content: {
    html?: string;
    text: string;
    template?: string;
  };
  recipients: {
    emails: string[];
    segments?: string[];
    excludeList?: string[];
  };
  scheduling: {
    sendImmediately?: boolean;
    scheduledAt?: Date;
    timezone?: string;
  };
  settings: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    replyTo?: string;
    fromName?: string;
    fromEmail?: string;
  };
}

export interface EmailSequenceData {
  name: string;
  trigger: 'signup' | 'purchase' | 'abandon_cart' | 'manual';
  emails: Array<{
    subject: string;
    content: {
      html?: string;
      text: string;
      template?: string;
    };
    delayDays: number;
    conditions?: Record<string, any>;
  }>;
  settings: {
    trackOpens?: boolean;
    trackClicks?: boolean;
    replyTo?: string;
    fromName?: string;
    fromEmail?: string;
  };
}

export interface ABTestData {
  variants: Array<{
    name: string;
    subject: string;
    content: any;
  }>;
  splitRatio: number[];
  testDuration: number;
}

export const useEmailAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutations
  const sendCampaignMutation = trpc.email.sendCampaign.useMutation({
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

  const createSequenceMutation = trpc.email.createSequence.useMutation({
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

  const runABTestMutation = trpc.email.runABTest.useMutation({
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

  const manageListMutation = trpc.email.manageList.useMutation({
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
  const { data: emailTemplates, isLoading: templatesLoading } = trpc.email.getEmailTemplates.useQuery();

  const getAnalyticsQuery = (campaignId: string) => 
    trpc.email.getAnalytics.useQuery({ campaignId }, { enabled: !!campaignId });

  // Action functions
  const sendCampaign = async (campaignData: EmailCampaignData) => {
    try {
      const result = await sendCampaignMutation.mutateAsync(campaignData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const createSequence = async (sequenceData: EmailSequenceData) => {
    try {
      const result = await createSequenceMutation.mutateAsync(sequenceData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const runABTest = async (testData: ABTestData) => {
    try {
      const result = await runABTestMutation.mutateAsync(testData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const manageList = async (listData: {
    action: 'create_list' | 'add_subscribers' | 'remove_subscribers' | 'clean_list';
    listId?: string;
    listName?: string;
    emails?: string[];
    totalCount?: number;
  }) => {
    try {
      const result = await manageListMutation.mutateAsync(listData);
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
    sendCampaign,
    createSequence,
    runABTest,
    manageList,
    clearError,
    getAnalyticsQuery,
    
    // Data
    emailTemplates,
    
    // States
    isLoading,
    templatesLoading,
    error,
    
    // Mutation states
    isSendingCampaign: sendCampaignMutation.isLoading,
    isCreatingSequence: createSequenceMutation.isLoading,
    isRunningABTest: runABTestMutation.isLoading,
    isManagingList: manageListMutation.isLoading,
  };
};