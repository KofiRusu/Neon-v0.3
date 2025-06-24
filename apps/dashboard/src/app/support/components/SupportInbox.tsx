'use client';

import { useState, useEffect } from 'react';
import { 
  InboxIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useSupportAgent } from '../../../lib/hooks/useSupportAgent';

interface SupportInboxProps {
  selectedThread: string | null;
}

// Mock conversation data - in production this would come from a tickets query
const mockConversation = {
  id: 'thread_001',
  customer: {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: null,
  },
  subject: 'Issue with account verification',
  status: 'open',
  priority: 'medium',
  channel: 'email',
  createdAt: new Date('2024-01-16T10:30:00Z'),
  messages: [
    {
      id: 'msg_001',
      sender: 'customer',
      content: 'Hi, I\'m having trouble verifying my account. I\'ve tried multiple times but keep getting an error message.',
      timestamp: new Date('2024-01-16T10:30:00Z'),
      type: 'text',
    },
    {
      id: 'msg_002',
      sender: 'agent',
      content: 'Hello Sarah! I understand you\'re having trouble with account verification. I\'d be happy to help you resolve this issue. Can you please tell me what specific error message you\'re seeing?',
      timestamp: new Date('2024-01-16T10:35:00Z'),
      type: 'text',
      agentName: 'Alex Support',
    },
    {
      id: 'msg_003',
      sender: 'customer',
      content: 'The error says "Verification code expired" even when I use it immediately after receiving it.',
      timestamp: new Date('2024-01-16T10:37:00Z'),
      type: 'text',
    },
  ],
};

export default function SupportInbox({ selectedThread }: SupportInboxProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showEscalation, setShowEscalation] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [sentimentAnalysis, setSentimentAnalysis] = useState<any>(null);

  const {
    generateAutoResponse,
    analyzeSentiment,
    escalateTicket,
    updateTicket,
    isGeneratingResponse: isGeneratingAI,
    isAnalyzingSentiment,
    isEscalatingTicket,
    isUpdatingTicket,
    error,
    clearError
  } = useSupportAgent();

  // Analyze sentiment of the latest customer message
  useEffect(() => {
    if (selectedThread && mockConversation.messages.length > 0) {
      const lastCustomerMessage = mockConversation.messages
        .filter(msg => msg.sender === 'customer')
        .pop();
      
      if (lastCustomerMessage) {
        analyzeSentiment(lastCustomerMessage.content).then((result) => {
          setSentimentAnalysis(result);
        }).catch(console.error);
      }
    }
  }, [selectedThread, analyzeSentiment]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    clearError();

    try {
      // In a real app, this would send the message via API
      // For now, we'll just add it to the mock conversation
      console.log('Sending message:', newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  const handleGenerateAutoResponse = async () => {
    if (!selectedThread) return;

    setIsGeneratingResponse(true);
    clearError();

    try {
      const lastCustomerMessage = mockConversation.messages
        .filter(msg => msg.sender === 'customer')
        .pop();

      if (lastCustomerMessage) {
        const response = await generateAutoResponse({
          message: lastCustomerMessage.content,
          customer: mockConversation.customer,
          ticketHistory: mockConversation.messages,
        });

        if (response.data?.suggestedResponse) {
          setNewMessage(response.data.suggestedResponse);
        }
      }
    } catch (error) {
      console.error('Auto-response generation failed:', error);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleEscalateTicket = async () => {
    if (!selectedThread) return;

    clearError();

    try {
      await escalateTicket({
        ticketId: selectedThread,
        reason: 'Complex technical issue requiring specialist attention',
        priority: 'high',
        requiredSkills: ['technical-support', 'account-management'],
        urgency: 'medium',
      });

      setShowEscalation(false);
    } catch (error) {
      console.error('Escalation failed:', error);
    }
  };

  const handleUpdateTicketStatus = async (status: 'resolved' | 'closed') => {
    if (!selectedThread) return;

    clearError();

    try {
      await updateTicket({
        ticketId: selectedThread,
        update: { status },
        agentId: 'agent_001', // In real app, get from auth context
      });
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      case 'neutral': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedThread) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <InboxIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-600">Choose a ticket from the list to start helping customers</p>
        </div>
      </div>
    );
  }

  const conversation = mockConversation;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{conversation.customer.name}</h2>
              <p className="text-sm text-gray-600">{conversation.subject}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sentiment Analysis */}
            {sentimentAnalysis && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sentiment:</span>
                <span className={`text-xs font-medium ${getSentimentColor(sentimentAnalysis.data?.sentiment)}`}>
                  {sentimentAnalysis.data?.sentiment || 'Unknown'}
                </span>
              </div>
            )}
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
              {conversation.priority}
            </span>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEscalation(true)}
                disabled={isEscalatingTicket}
                className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 transition-colors disabled:opacity-50"
              >
                {isEscalatingTicket ? 'Escalating...' : 'Escalate'}
              </button>
              
              <button
                onClick={() => handleUpdateTicketStatus('resolved')}
                disabled={isUpdatingTicket}
                className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                {isUpdatingTicket ? 'Updating...' : 'Resolve'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'customer'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs opacity-75">
                  {message.sender === 'agent' && message.agentName ? message.agentName : ''}
                </p>
                <p className="text-xs opacity-75">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* AI Response Indicator */}
        {(isGeneratingAI || isGeneratingResponse) && (
          <div className="flex justify-end">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-blue-100 border-2 border-blue-200">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                <p className="text-xs text-blue-700">AI is generating response...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                disabled={isGeneratingAI || isGeneratingResponse}
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGenerateAutoResponse}
                disabled={isGeneratingResponse || isGeneratingAI}
                className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                title="Generate AI Response"
              >
                <SparklesIcon className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!newMessage.trim() || isGeneratingAI || isGeneratingResponse}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>Press Ctrl+Enter to send</span>
              {isAnalyzingSentiment && (
                <span className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400"></div>
                  Analyzing sentiment...
                </span>
              )}
            </div>
            <span>{newMessage.length}/1000</span>
          </div>
        </form>
      </div>

      {/* Escalation Modal */}
      {showEscalation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Escalate Ticket</h3>
            <p className="text-sm text-gray-600 mb-4">
              This will escalate the ticket to a specialist. Are you sure you want to continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEscalation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEscalateTicket}
                disabled={isEscalatingTicket}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                {isEscalatingTicket ? 'Escalating...' : 'Escalate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 