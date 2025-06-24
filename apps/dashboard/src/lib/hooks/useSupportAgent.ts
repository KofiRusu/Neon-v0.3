import { useState } from 'react';
import { trpc } from '../trpc';

export interface WhatsAppMessageData {
  recipient: string;
  message: {
    type: 'text' | 'image' | 'document' | 'template';
    content: string;
    media?: {
      url: string;
      caption?: string;
      filename?: string;
    };
    template?: {
      name: string;
      language: string;
      parameters?: string[];
    };
  };
  settings: {
    businessId?: string;
    accessToken?: string;
    webhookUrl?: string;
  };
}

export interface TicketData {
  ticketId?: string;
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    customerId?: string;
  };
  channel: 'whatsapp' | 'email' | 'chat' | 'phone' | 'social';
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  metadata?: Record<string, any>;
}

export interface TicketUpdateData {
  ticketId: string;
  update: {
    status?: 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    assignedTo?: string;
    resolution?: string;
    satisfactionScore?: number;
    customerConfirmed?: boolean;
    tags?: string[];
  };
  agentId: string;
}

export interface AutoResponseData {
  message: string;
  customer: {
    name?: string;
    email?: string;
    phone?: string;
    customerId?: string;
  };
  ticketHistory?: any[];
}

export interface EscalationData {
  ticketId: string;
  reason: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiredSkills?: string[];
  urgency?: 'low' | 'medium' | 'high';
}

export const useSupportAgent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutations
  const sendWhatsAppMessageMutation = trpc.support.sendWhatsAppMessage.useMutation({
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

  const createTicketMutation = trpc.support.createTicket.useMutation({
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

  const updateTicketMutation = trpc.support.updateTicket.useMutation({
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

  const generateAutoResponseMutation = trpc.support.generateAutoResponse.useMutation({
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

  const escalateTicketMutation = trpc.support.escalateTicket.useMutation({
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

  const analyzeSentimentMutation = trpc.support.analyzeSentiment.useMutation({
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

  const manageKnowledgeBaseMutation = trpc.support.manageKnowledgeBase.useMutation({
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
  const { data: supportAgents, isLoading: agentsLoading } = trpc.support.getSupportAgents.useQuery();
  const { data: whatsappTemplates, isLoading: templatesLoading } = trpc.support.getWhatsAppTemplates.useQuery();

  const getTicketAnalyticsQuery = (timeRange: { start: Date; end: Date }, filters?: {
    channel?: string[];
    priority?: string[];
    status?: string[];
    agentId?: string;
  }) => trpc.support.getTicketAnalytics.useQuery({ timeRange, filters });

  const generateTicketSummaryQuery = (ticketId: string) =>
    trpc.support.generateTicketSummary.useQuery({ ticketId }, { enabled: !!ticketId });

  // Action functions
  const sendWhatsAppMessage = async (messageData: WhatsAppMessageData) => {
    try {
      const result = await sendWhatsAppMessageMutation.mutateAsync(messageData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const createTicket = async (ticketData: TicketData) => {
    try {
      const result = await createTicketMutation.mutateAsync(ticketData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateTicket = async (updateData: TicketUpdateData) => {
    try {
      const result = await updateTicketMutation.mutateAsync(updateData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const generateAutoResponse = async (responseData: AutoResponseData) => {
    try {
      const result = await generateAutoResponseMutation.mutateAsync(responseData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const escalateTicket = async (escalationData: EscalationData) => {
    try {
      const result = await escalateTicketMutation.mutateAsync(escalationData);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const analyzeSentiment = async (message: string) => {
    try {
      const result = await analyzeSentimentMutation.mutateAsync({ message });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const manageKnowledgeBase = async (action: 'add_article' | 'update_article' | 'search_articles' | 'get_suggestions', data: any) => {
    try {
      const result = await manageKnowledgeBaseMutation.mutateAsync({ action, data });
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
    sendWhatsAppMessage,
    createTicket,
    updateTicket,
    generateAutoResponse,
    escalateTicket,
    analyzeSentiment,
    manageKnowledgeBase,
    clearError,
    getTicketAnalyticsQuery,
    generateTicketSummaryQuery,
    
    // Data
    supportAgents,
    whatsappTemplates,
    
    // States
    isLoading,
    agentsLoading,
    templatesLoading,
    error,
    
    // Mutation states
    isSendingMessage: sendWhatsAppMessageMutation.isLoading,
    isCreatingTicket: createTicketMutation.isLoading,
    isUpdatingTicket: updateTicketMutation.isLoading,
    isGeneratingResponse: generateAutoResponseMutation.isLoading,
    isEscalatingTicket: escalateTicketMutation.isLoading,
    isAnalyzingSentiment: analyzeSentimentMutation.isLoading,
    isManagingKnowledgeBase: manageKnowledgeBaseMutation.isLoading,
  };
};