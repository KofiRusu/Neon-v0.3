'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage(): JSX.Element {
  const [metrics, setMetrics] = useState({
    totalCampaigns: 0,
    activeAgents: 0,
    totalRevenue: 0,
    conversionRate: 0,
    leadQuality: 0,
    agentPerformance: [] as Array<{ name: string; score: number; trend: number }>,
    campaignMetrics: [] as Array<{
      name: string;
      impressions: number;
      clicks: number;
      conversions: number;
      roi: number;
      status: 'active' | 'paused' | 'completed';
    }>,
    timeSeriesData: [] as Array<{
      date: string;
      revenue: number;
      leads: number;
      conversions: number;
    }>,
  });

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async (): Promise<void> => {
      setIsLoading(true);
      try {
        // Simulate API call - replace with actual API integration
        await new Promise(resolve => setTimeout(resolve, 1000));

        setMetrics({
          totalCampaigns: 24,
          activeAgents: 6,
          totalRevenue: 847250,
          conversionRate: 3.4,
          leadQuality: 87.5,
          agentPerformance: [
            { name: 'Content Agent', score: 94, trend: 5.2 },
            { name: 'Ad Agent', score: 91, trend: 2.8 },
            { name: 'Outreach Agent', score: 88, trend: -1.2 },
            { name: 'Trend Agent', score: 96, trend: 8.1 },
            { name: 'Insight Agent', score: 92, trend: 3.5 },
            { name: 'Design Agent', score: 89, trend: 4.2 },
          ],
          campaignMetrics: [
            {
              name: 'Summer Neon Collection',
              impressions: 2450000,
              clicks: 83300,
              conversions: 2830,
              roi: 4.2,
              status: 'active',
            },
            {
              name: 'B2B Outreach Q4',
              impressions: 890000,
              clicks: 34200,
              conversions: 1150,
              roi: 3.8,
              status: 'active',
            },
            {
              name: 'Black Friday Special',
              impressions: 1850000,
              clicks: 67800,
              conversions: 3420,
              roi: 5.1,
              status: 'completed',
            },
          ],
          timeSeriesData: generateTimeSeriesData(timeRange),
        });
      } catch (error) {
        // Error handling - could be logged to external service
        console.error('Failed to fetch analytics:', error);
        setMetrics(prev => ({ ...prev })); // Keep existing state on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const generateTimeSeriesData = (range: '7d' | '30d' | '90d'): Array<{ date: string; revenue: number; leads: number; conversions: number }> => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 5000) + 15000,
        leads: Math.floor(Math.random() * 100) + 50,
        conversions: Math.floor(Math.random() * 50) + 20,
      });
    }

    return data;
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
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-purple-200">Real-time insights into your AI marketing ecosystem</p>
          </div>
          <div className="flex space-x-2">
            {(['7d', '30d', '90d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title="Total Revenue"
            value={`$${(metrics.totalRevenue / 1000).toFixed(0)}K`}
            change="+12.5%"
            positive={true}
            icon="💰"
          />
          <MetricCard
            title="Active Campaigns"
            value={metrics.totalCampaigns.toString()}
            change="+3"
            positive={true}
            icon="🚀"
          />
          <MetricCard
            title="Agent Performance"
            value={`${(metrics.agentPerformance.reduce((acc, agent) => acc + agent.score, 0) / metrics.agentPerformance.length).toFixed(1)}%`}
            change="+2.3%"
            positive={true}
            icon="🤖"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change="+0.8%"
            positive={true}
            icon="📈"
          />
          <MetricCard
            title="Lead Quality"
            value={`${metrics.leadQuality}%`}
            change="+5.2%"
            positive={true}
            icon="⭐"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Trend Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-end space-x-2">
              {metrics.timeSeriesData.slice(-10).map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t"
                    style={{ height: `${(data.revenue / 25000) * 100}%` }}
                  />
                  <span className="text-xs text-purple-200 mt-2 transform -rotate-45 origin-left">
                    {data.date.slice(-5)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Performance */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Agent Performance</h3>
            <div className="space-y-4">
              {metrics.agentPerformance.map((agent, index) => (
                <a
                  key={index}
                  href={`/analytics/agents/${agent.name.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <span className="text-white font-medium group-hover:text-purple-200">{agent.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${agent.score}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-12">{agent.score}%</span>
                    <span
                      className={`text-sm font-medium ${
                        agent.trend >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {agent.trend >= 0 ? '+' : ''}
                      {agent.trend}%
                    </span>
                    <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Performance Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6">Campaign Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-purple-200 font-medium py-3">Campaign</th>
                  <th className="text-left text-purple-200 font-medium py-3">Status</th>
                  <th className="text-right text-purple-200 font-medium py-3">Impressions</th>
                  <th className="text-right text-purple-200 font-medium py-3">Clicks</th>
                  <th className="text-right text-purple-200 font-medium py-3">Conversions</th>
                  <th className="text-right text-purple-200 font-medium py-3">ROI</th>
                </tr>
              </thead>
              <tbody>
                {metrics.campaignMetrics.map((campaign, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 text-white font-medium">{campaign.name}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active'
                            ? 'bg-green-500/20 text-green-400'
                            : campaign.status === 'completed'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-white">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-white">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-white">
                      {campaign.conversions.toLocaleString()}
                    </td>
                    <td className="py-4 text-right text-green-400 font-semibold">
                      {campaign.roi}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Real-time Alerts</h3>
          <div className="space-y-3">
            <Alert type="success" message="Content Agent exceeded performance target by 8%" />
            <Alert type="warning" message="Outreach Agent response rate below threshold" />
            <Alert type="info" message="New trending keyword detected: 'AI automation'" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

function MetricCard({ title, value, change, positive, icon }: MetricCardProps): JSX.Element {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-purple-200 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

interface AlertProps {
  type: 'success' | 'warning' | 'info';
  message: string;
}

function Alert({ type, message }: AlertProps): JSX.Element {
  const colors = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const icons = {
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border ${colors[type]}`}>
      <span>{icons[type]}</span>
      <span className="text-sm">{message}</span>
    </div>
  );
}
