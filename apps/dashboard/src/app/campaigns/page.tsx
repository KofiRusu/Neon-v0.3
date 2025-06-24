'use client';

import { useState, useEffect } from 'react';
import { trpc } from '../../lib/trpc';
import {
  PlayIcon,
  PauseIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface Campaign {
  id: string;
  name: string;
  type: 'social_media' | 'email' | 'display' | 'search' | 'video';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  roi: number;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  agentsAssigned: string[];
  createdAt: string;
  lastModified: string;
}

export default function CampaignsPage(): JSX.Element {
  const { data: campaigns, isLoading } = trpc.campaign.getAll.useQuery({ limit: 20 });
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Campaign['status']>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Campaign['type']>('all');
  const [sortBy, setSortBy] = useState<'name' | 'roi' | 'budget' | 'created'>('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async (): Promise<void> => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockCampaigns: Campaign[] = [
          {
            id: 'camp-1',
            name: 'Summer Neon Collection 2024',
            type: 'social_media',
            status: 'active',
            budget: 15000,
            spent: 8750,
            roi: 4.2,
            impressions: 2450000,
            clicks: 83300,
            conversions: 2830,
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            targetAudience: 'Young Adults 18-35',
            agentsAssigned: ['Content Agent', 'Design Agent', 'Trend Agent'],
            createdAt: '2024-05-15',
            lastModified: '2024-12-19',
          },
          {
            id: 'camp-2',
            name: 'B2B Outreach Q4 2024',
            type: 'email',
            status: 'active',
            budget: 8000,
            spent: 6200,
            roi: 3.8,
            impressions: 890000,
            clicks: 34200,
            conversions: 1150,
            startDate: '2024-10-01',
            endDate: '2024-12-31',
            targetAudience: 'Business Decision Makers',
            agentsAssigned: ['Outreach Agent', 'Content Agent'],
            createdAt: '2024-09-15',
            lastModified: '2024-12-18',
          },
          {
            id: 'camp-3',
            name: 'Black Friday Special 2024',
            type: 'display',
            status: 'completed',
            budget: 25000,
            spent: 24800,
            roi: 5.1,
            impressions: 1850000,
            clicks: 67800,
            conversions: 3420,
            startDate: '2024-11-20',
            endDate: '2024-11-30',
            targetAudience: 'Holiday Shoppers',
            agentsAssigned: ['Ad Agent', 'Design Agent', 'Insight Agent'],
            createdAt: '2024-11-01',
            lastModified: '2024-12-01',
          },
          {
            id: 'camp-4',
            name: 'New Year Resolution Fitness',
            type: 'video',
            status: 'draft',
            budget: 12000,
            spent: 0,
            roi: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            startDate: '2025-01-01',
            endDate: '2025-01-31',
            targetAudience: 'Fitness Enthusiasts',
            agentsAssigned: ['Content Agent', 'Design Agent'],
            createdAt: '2024-12-10',
            lastModified: '2024-12-15',
          },
          {
            id: 'camp-5',
            name: 'Spring Launch Campaign',
            type: 'search',
            status: 'paused',
            budget: 18000,
            spent: 4500,
            roi: 2.1,
            impressions: 456000,
            clicks: 12400,
            conversions: 340,
            startDate: '2024-03-01',
            endDate: '2024-05-31',
            targetAudience: 'Fashion Forward Consumers',
            agentsAssigned: ['Ad Agent', 'Trend Agent'],
            createdAt: '2024-02-15',
            lastModified: '2024-04-20',
          },
        ];

        setFilteredCampaigns(mockCampaigns);
      } catch (error) {
        // Error handling - could be logged to external service or shown to user
        console.error('Failed to fetch campaigns:', error);
        setFilteredCampaigns([]);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const filtered =
      campaigns?.filter(campaign => {
        const matchesSearch =
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
        const matchesType = typeFilter === 'all' || campaign.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      }) || [];

    // Sort campaigns
    filtered.sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (sortBy) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'roi':
          valueA = a.roi;
          valueB = b.roi;
          break;
        case 'budget':
          valueA = a.budget;
          valueB = b.budget;
          break;
        case 'created':
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          break;
        default:
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  const handleStatusChange = async (
    campaignId: string,
    newStatus: Campaign['status']
  ): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setFilteredCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === campaignId
            ? {
                ...campaign,
                status: newStatus,
                lastModified: new Date().toISOString().split('T')[0],
              }
            : campaign
        )
      );
    } catch (error) {
      // Error handling - could show error toast or notification
      console.error('Failed to update campaign status:', error);
      // For now, silently fail and keep existing state
    }
  };

  const getStatusColor = (status: Campaign['status']): string => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'draft':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: Campaign['type']): string => {
    switch (type) {
      case 'social_media':
        return '📱';
      case 'email':
        return '📧';
      case 'display':
        return '🖼️';
      case 'search':
        return '🔍';
      case 'video':
        return '🎥';
      default:
        return '��';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Campaign Management</h1>
            <p className="text-purple-200">
              Orchestrate and optimize your AI-driven marketing campaigns
            </p>
          </div>
          <button
            onClick={() => setShowNewCampaignModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            + New Campaign
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SummaryCard
            title="Total Campaigns"
            value={campaigns?.length.toString() || ''}
            subtext={`${campaigns?.filter(c => c.status === 'active').length} active`}
            icon="🚀"
          />
          <SummaryCard
            title="Total Budget"
            value={`$${campaigns?.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`}
            subtext={`$${campaigns?.reduce((sum, c) => sum + c.spent, 0).toLocaleString()} spent`}
            icon="💰"
          />
          <SummaryCard
            title="Average ROI"
            value={`${(campaigns?.reduce((sum, c) => sum + c.roi, 0) / campaigns?.length).toFixed(1)}x`}
            subtext="Across all campaigns"
            icon="📈"
          />
          <SummaryCard
            title="Total Conversions"
            value={campaigns?.reduce((sum, c) => sum + c.conversions, 0).toLocaleString() || ''}
            subtext="This month"
            icon="🎯"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as typeof typeFilter)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Types</option>
                <option value="social_media">Social Media</option>
                <option value="email">Email</option>
                <option value="display">Display</option>
                <option value="search">Search</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="created">Sort by Created</option>
                <option value="name">Sort by Name</option>
                <option value="roi">Sort by ROI</option>
                <option value="budget">Sort by Budget</option>
              </select>
            </div>
            <div>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white hover:bg-white/20 transition-all"
              >
                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </button>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              getTypeIcon={getTypeIcon}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
            <p className="text-purple-200">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* New Campaign Modal (placeholder) */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">New Campaign</h3>
            <p className="text-purple-200 mb-6">Campaign creation wizard coming soon!</p>
            <button
              onClick={() => setShowNewCampaignModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  subtext: string;
  icon: string;
}

function SummaryCard({ title, value, subtext, icon }: SummaryCardProps): JSX.Element {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-purple-200 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <p className="text-purple-300 text-xs mt-1">{subtext}</p>
    </div>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onStatusChange: (id: string, status: Campaign['status']) => Promise<void>;
  getStatusColor: (status: Campaign['status']) => string;
  getTypeIcon: (type: Campaign['type']) => string;
}

function CampaignCard({
  campaign,
  onStatusChange,
  getStatusColor,
  getTypeIcon,
}: CampaignCardProps): JSX.Element {
  const budgetUsed = (campaign.spent / campaign.budget) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
          <div>
            <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
            <p className="text-purple-200 text-sm">{campaign.targetAudience}</p>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}
        >
          {campaign.status}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-purple-200">Budget Progress</span>
          <span className="text-white">
            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div>
          <p className="text-white font-semibold">{campaign.roi}x</p>
          <p className="text-purple-200 text-xs">ROI</p>
        </div>
        <div>
          <p className="text-white font-semibold">{(campaign.impressions / 1000).toFixed(0)}K</p>
          <p className="text-purple-200 text-xs">Impressions</p>
        </div>
        <div>
          <p className="text-white font-semibold">{campaign.conversions.toLocaleString()}</p>
          <p className="text-purple-200 text-xs">Conversions</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-purple-200 text-xs mb-2">Assigned Agents</p>
        <div className="flex flex-wrap gap-1">
          {campaign.agentsAssigned.map((agent, index) => (
            <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
              {agent}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        {campaign.status === 'active' && (
          <button
            onClick={() => onStatusChange(campaign.id, 'paused')}
            className="flex-1 flex items-center justify-center space-x-1 bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-lg text-sm hover:bg-yellow-500/30 transition-all"
          >
            <PauseIcon className="h-4 w-4" />
            <span>Pause</span>
          </button>
        )}
        {campaign.status === 'paused' && (
          <button
            onClick={() => onStatusChange(campaign.id, 'active')}
            className="flex-1 flex items-center justify-center space-x-1 bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-all"
          >
            <PlayIcon className="h-4 w-4" />
            <span>Resume</span>
          </button>
        )}
        <button className="flex items-center justify-center bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
          <PencilIcon className="h-4 w-4" />
        </button>
        <button className="flex items-center justify-center bg-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm hover:bg-red-500/30 transition-all">
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
