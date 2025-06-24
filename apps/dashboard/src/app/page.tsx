'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../lib/trpc';
import {
  ChartBarIcon,
  CogIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real data from our API
  const { data: campaignStats } = trpc.campaign.getStats.useQuery();
  const { data: recentAgentActivity } = trpc.agent.getRecentActions.useQuery({ limit: 5 });

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/',
      icon: ChartBarIcon,
      current: true,
    },
    {
      id: 'agents',
      name: 'AI Agents',
      href: '/agents',
      icon: SparklesIcon,
      current: false,
    },
    {
      id: 'campaigns',
      name: 'Campaigns',
      href: '/campaigns',
      icon: MegaphoneIcon,
      current: false,
    },
    {
      id: 'email',
      name: 'Email Marketing',
      href: '/email',
      icon: EnvelopeIcon,
      current: false,
    },
    {
      id: 'social',
      name: 'Social Media',
      href: '/social',
      icon: GlobeAltIcon,
      current: false,
    },
    {
      id: 'support',
      name: 'Customer Support',
      href: '/support',
      icon: ChatBubbleLeftIcon,
      current: false,
    },
    {
      id: 'analytics',
      name: 'Analytics',
      href: '/analytics',
      icon: ArrowTrendingUpIcon,
      current: false,
    },
  ];

  const agents = [
    {
      id: 'content',
      name: 'Content Agent',
      status: 'active',
      icon: DocumentTextIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'AI-powered content generation',
      href: '/agents',
    },
    {
      id: 'seo',
      name: 'SEO Agent', 
      status: 'active',
      icon: MagnifyingGlassIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Search engine optimization',
      href: '/agents',
    },
    {
      id: 'email',
      name: 'Email Agent',
      status: 'active',
      icon: EnvelopeIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Email campaign automation',
      href: '/email',
    },
    {
      id: 'social',
      name: 'Social Agent',
      status: 'active',
      icon: GlobeAltIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      description: 'Social media management',
      href: '/social',
    },
    {
      id: 'support',
      name: 'Support Agent',
      status: 'active',
      icon: ChatBubbleLeftIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Customer support automation',
      href: '/support',
    },
    {
      id: 'analytics',
      name: 'Analytics Agent',
      status: 'active',
      icon: ChartBarIcon,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      description: 'Performance analytics',
      href: '/analytics',
    },
  ];

  const metrics = [
    {
      name: 'Total Campaigns',
      value: campaignStats?.total?.toString() || '0',
      change: '+2',
      changeType: 'positive',
      icon: MegaphoneIcon,
    },
    {
      name: 'Active Campaigns',
      value: campaignStats?.active?.toString() || '0',
      change: '+1',
      changeType: 'positive',
      icon: SparklesIcon,
    },
    {
      name: 'Completed',
      value: campaignStats?.completed?.toString() || '0',
      change: '+3',
      changeType: 'positive',
      icon: ChartBarIcon,
    },
    {
      name: 'Total Revenue',
      value: '$0',
      change: '+0%',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
    },
  ];

  // Use real activity data from API or fallback to mock data
  const recentActivity = recentAgentActivity?.map(activity => ({
    id: activity.id,
    agent: activity.agent,
    action: activity.action,
    time: new Date(activity.createdAt).toLocaleTimeString(),
    status: 'completed',
  })) || [
    {
      id: 1,
      agent: 'ContentAgent',
      action: 'Generated blog post',
      time: 'Just now',
      status: 'completed',
    },
    {
      id: 2,
      agent: 'SEOAgent',
      action: 'Optimized meta tags',
      time: '2 min ago',
      status: 'completed',
    },
    {
      id: 3,
      agent: 'EmailAgent',
      action: 'Sent campaign email',
      time: '5 min ago',
      status: 'completed',
    },
    {
      id: 4,
      agent: 'SocialAgent',
      action: 'Posted to Instagram',
      time: '10 min ago',
      status: 'completed',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">NeonHub</h1>
              </div>
              <span className="text-gray-500 hidden md:block">AI Marketing Platform</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <CogIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">
            Your AI agents are working hard to optimize your marketing campaigns.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {navigationItems.slice(1).map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.href} className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.id === 'agents' && 'Manage AI agents'}
                    {item.id === 'campaigns' && 'Create and manage campaigns'}
                    {item.id === 'email' && 'Email marketing automation'}
                    {item.id === 'social' && 'Social media management'}
                    {item.id === 'support' && 'Customer support tools'}
                    {item.id === 'analytics' && 'Performance insights'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-gray-600" />
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.changeType === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.change}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Agents Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">AI Agents Status</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agents.map((agent) => {
                    const Icon = agent.icon;
                    return (
                      <Link key={agent.id} href={agent.href} className="group">
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${agent.bgColor} rounded-lg flex items-center justify-center`}>
                                <Icon className={`h-5 w-5 ${agent.color}`} />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{agent.name}</h3>
                                <p className="text-sm text-gray-600">{agent.description}</p>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${
                              agent.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 capitalize">{agent.status}</span>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              {agent.status === 'active' ? (
                                <PauseIcon className="h-4 w-4" />
                              ) : (
                                <PlayIcon className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.agent}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/campaigns" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Campaign
              </Link>
              <Link href="/agents" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Manage Agents
              </Link>
              <Link href="/analytics" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
