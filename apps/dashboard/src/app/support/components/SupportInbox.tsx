'use client';

import { useState, useEffect } from 'react';
import { 
  PaperAirplaneIcon,
  FaceSmileIcon,
  PaperClipIcon,
  UserIcon,
  InboxIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import EscalationBanner from './EscalationBanner';
import { api } from '../../../utils/trpc';

interface SupportInboxProps {
  selectedThread: string | null;
}

interface Message {
  id: string;
  sender: 'customer' | 'ai' | 'agent';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string | null;
  };
  subject: string;
  status: 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  channel: 'whatsapp' | 'email' | 'chat' | 'phone' | 'social';
  escalated: boolean;
  createdAt: Date;
  messages: Message[];
}

export default function SupportInbox({ selectedThread }: SupportInboxProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showEscalation, setShowEscalation] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  // Get conversation details
  const { data: conversationData, isLoading } = api.support.getTicket.useQuery(
    { ticketId: selectedThread! },
    { enabled: !!selectedThread }
  );

  // Send message mutation
  const sendMessageMutation = api.support.sendMessage.useMutation({
    onSuccess: (response) => {
      setNewMessage('');
      // Add the sent message to the conversation
      if (conversation) {
        const newUserMessage: Message = {
          id: Date.now().toString(),
          sender: 'agent',
          content: newMessage,
          timestamp: new Date(),
          type: 'text'
        };
        setConversation({
          ...conversation,
          messages: [...conversation.messages, newUserMessage]
        });

        // If there's an AI response, add it too
        if (response.aiResponse) {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            content: response.aiResponse,
            timestamp: new Date(),
            type: 'text'
          };
          setTimeout(() => {
            setConversation(prev => prev ? {
              ...prev,
              messages: [...prev.messages, aiMessage]
            } : null);
          }, 1000);
        }
      }
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
    },
  });

  // Auto-response generation
  const generateAutoResponse = api.support.generateAutoResponse.useMutation();

  // Update ticket status
  const updateTicketMutation = api.support.updateTicket.useMutation({
    onSuccess: () => {
      // Refresh conversation data
      if (conversation) {
        setConversation({
          ...conversation,
          status: 'resolved'
        });
      }
    }
  });

  // Update conversation when data changes
  useEffect(() => {
    if (conversationData?.ticket) {
      const ticket = conversationData.ticket;
      setConversation({
        id: ticket.id,
        customer: ticket.customer,
        subject: ticket.subject,
        status: ticket.status,
        priority: ticket.priority,
        channel: ticket.channel,
        escalated: ticket.escalated || false,
        createdAt: new Date(ticket.createdAt),
        messages: ticket.messages || []
      });
    }
  }, [conversationData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread) return;

    try {
      await sendMessageMutation.mutateAsync({
        ticketId: selectedThread,
        content: newMessage,
        type: 'text',
        senderId: 'current-agent', // Would be dynamic in real app
      });
    } catch (error) {
      console.error('Send failed:', error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedThread) return;
    
    try {
      await updateTicketMutation.mutateAsync({
        ticketId: selectedThread,
        update: {
          status: newStatus as any,
        },
        agentId: 'current-agent'
      });
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleAutoResponse = async () => {
    if (!conversation || !selectedThread) return;

    try {
      const response = await generateAutoResponse.mutateAsync({
        message: conversation.messages[conversation.messages.length - 1]?.content || '',
        customer: conversation.customer,
        ticketHistory: conversation.messages
      });

      if (response.suggestion) {
        setNewMessage(response.suggestion);
      }
    } catch (error) {
      console.error('Auto-response generation failed:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    });
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

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

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Conversation not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Conversation Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {conversation.customer.avatar ? (
                <img 
                  src={conversation.customer.avatar} 
                  alt={conversation.customer.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <UserIcon className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{conversation.customer.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{conversation.customer.email}</span>
                <span className="capitalize">{conversation.channel}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  conversation.priority === 'high' || conversation.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  conversation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {conversation.priority} priority
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEscalation(true)}
              className="px-3 py-2 text-sm text-orange-600 hover:text-orange-700 border border-orange-200 rounded-lg hover:border-orange-300"
            >
              Escalate to Human
            </button>
            <button
              onClick={handleAutoResponse}
              disabled={generateAutoResponse.isLoading}
              className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:border-blue-300 disabled:opacity-50"
            >
              {generateAutoResponse.isLoading ? 'Generating...' : 'AI Suggest'}
            </button>
            <select 
              value={conversation.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="pending_customer">Pending Customer</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Escalation Banner */}
      {showEscalation && (
        <EscalationBanner onClose={() => setShowEscalation(false)} />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === 'customer' ? '' : 'flex-row-reverse'
            }`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {message.sender === 'customer' ? (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-gray-600" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="h-4 w-4 text-blue-600" />
                </div>
              )}
            </div>
            
            <div className={`max-w-md ${message.sender === 'customer' ? '' : 'text-right'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === 'customer'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-blue-600 text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your response..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <PaperClipIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <FaceSmileIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!newMessage.trim() || sendMessageMutation.isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {sendMessageMutation.isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <PaperAirplaneIcon className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 