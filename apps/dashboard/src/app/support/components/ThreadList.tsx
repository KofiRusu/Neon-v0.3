'use client';

import { useState, useEffect } from 'react';
import { 
  InboxIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import { useSupportAgent } from '../../../lib/hooks/useSupportAgent';

interface ThreadListProps {
  selectedThread: string | null;
  onSelectThread: (threadId: string) => void;
}

// Mock ticket data - in production this would come from a tickets query
const mockTickets = [
  {
    id: 'thread_001',
    customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
    subject: 'Issue with account verification',
    lastMessage: 'The error says "Verification code expired" even when I use it immediately...',
    status: 'open',
    priority: 'medium',
    channel: 'email',
    unreadCount: 1,
    createdAt: new Date('2024-01-16T10:30:00Z'),
    updatedAt: new Date('2024-01-16T10:37:00Z'),
  },
  {
    id: 'thread_002',
    customer: { name: 'Mike Chen', email: 'mike@example.com' },
    subject: 'Billing question about subscription',
    lastMessage: 'I was charged twice for my subscription this month. Can you help?',
    status: 'in_progress',
    priority: 'high',
    channel: 'chat',
    unreadCount: 0,
    createdAt: new Date('2024-01-15T14:20:00Z'),
    updatedAt: new Date('2024-01-16T09:15:00Z'),
  },
  {
    id: 'thread_003',
    customer: { name: 'Emily Rodriguez', email: 'emily@example.com' },
    subject: 'Feature request for mobile app',
    lastMessage: 'Thank you for the clarification! This resolves my question.',
    status: 'resolved',
    priority: 'low',
    channel: 'whatsapp',
    unreadCount: 0,
    createdAt: new Date('2024-01-14T16:45:00Z'),
    updatedAt: new Date('2024-01-15T11:30:00Z'),
  },
  {
    id: 'thread_004',
    customer: { name: 'David Wilson', email: 'david@example.com' },
    subject: 'Unable to reset password',
    lastMessage: 'I keep getting an error when trying to reset my password.',
    status: 'open',
    priority: 'critical',
    channel: 'email',
    unreadCount: 2,
    createdAt: new Date('2024-01-16T11:15:00Z'),
    updatedAt: new Date('2024-01-16T11:45:00Z'),
  },
];

export default function ThreadList({ selectedThread, onSelectThread }: ThreadListProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'priority'>('recent');
  const [ticketSummaries, setTicketSummaries] = useState<Record<string, any>>({});

  const {
    getTicketAnalyticsQuery,
    generateTicketSummaryQuery,
    error,
    clearError
  } = useSupportAgent();

  // Get ticket analytics for the current time range
  const analyticsQuery = getTicketAnalyticsQuery(
    {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      end: new Date(),
    },
    {
      status: filterStatus !== 'all' ? [filterStatus] : undefined,
    }
  );

  // Generate summaries for tickets
  useEffect(() => {
    mockTickets.forEach(async (ticket) => {
      if (!ticketSummaries[ticket.id]) {
        try {
          const summary = generateTicketSummaryQuery(ticket.id);
          if (summary.data) {
            setTicketSummaries(prev => ({
              ...prev,
              [ticket.id]: summary.data
            }));
          }
        } catch (error) {
          console.error('Failed to generate summary for ticket:', ticket.id, error);
        }
      }
    });
  }, [generateTicketSummaryQuery, ticketSummaries]);

  // Filter and sort tickets
  const filteredTickets = mockTickets
    .filter(ticket => filterStatus === 'all' || ticket.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending_customer': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return '📧';
      case 'chat': return '💬';
      case 'whatsapp': return '📱';
      case 'phone': return '☎️';
      case 'social': return '🌐';
      default: return '💬';
    }
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Support Tickets</h2>
          <div className="text-sm text-gray-500">
            {filteredTickets.length} tickets
          </div>
        </div>

        {/* Analytics Summary */}
        {analyticsQuery.data && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                {analyticsQuery.data.data?.totalTickets || 0}
              </div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {analyticsQuery.data.data?.resolvedTickets || 0}
              </div>
              <div className="text-xs text-gray-500">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">
                {analyticsQuery.data.data?.avgResponseTime || 0}m
              </div>
              <div className="text-xs text-gray-500">Avg Response</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="space-y-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="pending_customer">Pending Customer</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'priority')}
            className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Sort by Recent</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-1">
              <ExclamationTriangleIcon className="h-3 w-3 text-red-500" />
              <p className="text-xs text-red-600">{error}</p>
            </div>
            <button
              onClick={clearError}
              className="text-xs text-red-500 hover:text-red-700 underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <InboxIcon className="h-8 w-8 mb-2" />
            <p className="text-sm">No tickets found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onSelectThread(ticket.id)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedThread === ticket.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ticket.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {ticket.customer.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{getChannelIcon(ticket.channel)}</span>
                    {ticket.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white min-w-[1.25rem] h-5">
                        {ticket.unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {ticket.subject}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {ticket.lastMessage}
                </p>

                {/* AI Summary */}
                {ticketSummaries[ticket.id] && (
                  <div className="mb-2 p-2 bg-purple-50 rounded-md">
                    <p className="text-xs text-purple-700 font-medium">AI Summary:</p>
                    <p className="text-xs text-purple-600 line-clamp-1">
                      {ticketSummaries[ticket.id].summary || 'Generating summary...'}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ClockIcon className="h-3 w-3" />
                    {formatRelativeTime(ticket.updatedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-2 gap-2">
          <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
            <ChatBubbleLeftIcon className="h-3 w-3 inline mr-1" />
            New Ticket
          </button>
          <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors">
            <CheckCircleIcon className="h-3 w-3 inline mr-1" />
            Bulk Actions
          </button>
        </div>
      </div>
    </div>
  );
} 