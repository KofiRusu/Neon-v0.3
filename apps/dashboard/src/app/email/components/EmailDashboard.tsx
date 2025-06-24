'use client';

import { useState, useEffect } from 'react';
import { 
  EnvelopeIcon,
  EnvelopeOpenIcon,
  CursorArrowRaysIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useEmailAgent } from '../../../lib/hooks/useEmailAgent';

interface EmailDashboardProps {
  showCampaigns?: boolean;
}

export default function EmailDashboard({ showCampaigns = false }: EmailDashboardProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [campaignAnalytics, setCampaignAnalytics] = useState<any>(null);
  
  const {
    emailTemplates,
    templatesLoading,
    getAnalyticsQuery,
    error,
    clearError,
    isLoading
  } = useEmailAgent();

  // Mock campaign data for now - in production this would come from a campaigns query
  const campaigns = [
    {
      id: 'camp_001',
      name: 'Welcome Series - New Users',
      subject: 'Welcome to NeonHub! 🚀',
      status: 'sent',
      sentAt: '2024-01-15T10:00:00Z',
      recipients: 1250,
      openRate: 32.1,
      clickRate: 5.8,
      type: 'welcome'
    },
    {
      id: 'camp_002',
      name: 'Product Update Newsletter',
      subject: 'New AI Features Available Now',
      status: 'scheduled',
      scheduledAt: '2024-01-20T09:00:00Z',
      recipients: 5420,
      openRate: 0,
      clickRate: 0,
      type: 'newsletter'
    },
    {
      id: 'camp_003',
      name: 'Abandoned Cart Recovery',
      subject: 'Complete your purchase - 20% off',
      status: 'sending',
      sentAt: '2024-01-16T14:30:00Z',
      recipients: 890,
      openRate: 24.6,
      clickRate: 8.2,
      type: 'promotional'
    },
  ];

  // Get analytics for selected campaign
  const analyticsQuery = selectedCampaign ? getAnalyticsQuery(selectedCampaign) : null;
  
  useEffect(() => {
    if (analyticsQuery?.data) {
      setCampaignAnalytics(analyticsQuery.data);
    }
  }, [analyticsQuery?.data]);

  // Calculate stats from campaigns
  const stats = {
    totalCampaigns: campaigns.length,
    totalSent: campaigns.reduce((sum, c) => sum + c.recipients, 0),
    avgOpenRate: campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length,
    avgClickRate: campaigns.reduce((sum, c) => sum + c.clickRate, 0) / campaigns.length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaign(campaignId);
  };

  // Error handling
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            <h3 className="text-sm font-medium text-red-800">Error Loading Email Data</h3>
          </div>
          <p className="text-sm text-red-700 mt-1">{error}</p>
          <button
            onClick={clearError}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showCampaigns) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Campaigns</h2>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {/* Campaign List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                <div className="col-span-4">Campaign</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Recipients</div>
                <div className="col-span-1">Open Rate</div>
                <div className="col-span-1">Click Rate</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className={`px-6 py-4 transition-colors cursor-pointer ${
                    selectedCampaign === campaign.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleCampaignSelect(campaign.id)}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <EnvelopeIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.subject}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        {campaign.status === 'scheduled' 
                          ? `Scheduled ${formatDate(campaign.scheduledAt!)}`
                          : `Sent ${formatDate(campaign.sentAt)}`
                        }
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.openRate > 0 ? `${campaign.openRate.toFixed(1)}%` : '-'}
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.clickRate > 0 ? `${campaign.clickRate.toFixed(1)}%` : '-'}
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Campaign Analytics */}
          {selectedCampaign && campaignAnalytics && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{campaignAnalytics.totalSent || 0}</div>
                  <div className="text-sm text-gray-600">Total Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{campaignAnalytics.openRate || 0}%</div>
                  <div className="text-sm text-gray-600">Open Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{campaignAnalytics.clickRate || 0}%</div>
                  <div className="text-sm text-gray-600">Click Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{campaignAnalytics.bounceRate || 0}%</div>
                  <div className="text-sm text-gray-600">Bounce Rate</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <EnvelopeIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <EnvelopeOpenIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgOpenRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgClickRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CursorArrowRaysIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Templates</h2>
          {templatesLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          )}
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {emailTemplates?.data && emailTemplates.data.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {emailTemplates.data.map((template: any) => (
                <div key={template.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.subject}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      {template.variables && (
                        <div>
                          <span className="text-gray-600">Variables:</span>
                          <span className="ml-1 font-medium">{template.variables.join(', ')}</span>
                        </div>
                      )}
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              {templatesLoading ? 'Loading templates...' : 'No templates available'}
            </div>
          )}
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Campaigns</h2>
          <button 
            onClick={() => setSelectedCampaign('all')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View all
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {campaigns.slice(0, 3).map((campaign) => (
              <div 
                key={campaign.id} 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => handleCampaignSelect(campaign.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-500">{campaign.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Recipients:</span>
                      <span className="ml-1 font-medium">{campaign.recipients.toLocaleString()}</span>
                    </div>
                    {campaign.openRate > 0 && (
                      <>
                        <div>
                          <span className="text-gray-600">Open Rate:</span>
                          <span className="ml-1 font-medium">{campaign.openRate.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Click Rate:</span>
                          <span className="ml-1 font-medium">{campaign.clickRate.toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <EnvelopeIcon className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Create Campaign</h3>
            <p className="text-sm text-gray-600">Start a new email campaign with AI assistance</p>
          </button>

          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all text-left">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <UserGroupIcon className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Manage Lists</h3>
            <p className="text-sm text-gray-600">Add or segment audiences with AI insights</p>
          </button>

          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all text-left">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <ChartBarIcon className="h-4 w-4 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">View Analytics</h3>
            <p className="text-sm text-gray-600">Deep dive into AI-powered performance insights</p>
          </button>
        </div>
      </div>
    </div>
  );
} 