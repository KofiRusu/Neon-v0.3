'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  MessageSquare, 
  Target, 
  BarChart3, 
  Settings, 
  Plus,
  Brain,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { BrandVoiceProfileModal } from '@/components/BrandVoiceProfileModal';
import { ContentVoiceAnalyzer } from '@/components/ContentVoiceAnalyzer';
import { VoiceGuidelinesPanel } from '@/components/VoiceGuidelinesPanel';

// Mock data - in real implementation, this would come from tRPC
const mockProfiles = [
  {
    id: '1',
    name: 'Corporate Professional',
    description: 'Professional, authoritative, and solution-focused voice',
    isActive: true,
    averageScore: 85,
    analysisCount: 124,
    lastUsed: new Date('2024-01-15'),
    consistency: 92,
  },
  {
    id: '2',
    name: 'Friendly & Approachable',
    description: 'Warm, conversational, and customer-centric tone',
    isActive: false,
    averageScore: 78,
    analysisCount: 67,
    lastUsed: new Date('2024-01-10'),
    consistency: 88,
  },
];

const mockRecentAnalyses = [
  {
    id: '1',
    contentType: 'email',
    voiceScore: 89,
    analyzedAt: new Date('2024-01-15T10:30:00'),
    suggestions: 2,
  },
  {
    id: '2',
    contentType: 'social',
    voiceScore: 72,
    analyzedAt: new Date('2024-01-15T09:15:00'),
    suggestions: 4,
  },
  {
    id: '3',
    contentType: 'blog',
    voiceScore: 94,
    analyzedAt: new Date('2024-01-14T16:45:00'),
    suggestions: 1,
  },
];

const mockConsistencyData = [
  { contentType: 'Email', score: 85, count: 45, trend: 'up' },
  { contentType: 'Social', score: 78, count: 32, trend: 'down' },
  { contentType: 'Blog', score: 92, count: 18, trend: 'up' },
  { contentType: 'Ads', score: 81, count: 29, trend: 'stable' },
];

export default function BrandVoicePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(mockProfiles[0]);
  const [isLoading, setIsLoading] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Voice</h1>
          <p className="text-gray-600 mt-2">
            Maintain consistent brand messaging across all content channels
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setProfileModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Profile
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            Analyze Content
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Consistency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Voice Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">
              Across all content types
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Analyzed</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Profiles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 in use this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analyzer">Content Analyzer</TabsTrigger>
          <TabsTrigger value="profiles">Voice Profiles</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Consistency by Content Type */}
          <Card>
            <CardHeader>
              <CardTitle>Voice Consistency by Content Type</CardTitle>
              <CardDescription>
                Track how consistent your brand voice is across different content channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConsistencyData.map((item) => (
                  <div key={item.contentType} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium">{item.contentType}</div>
                      <Badge variant="outline">{item.count} items</Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`text-lg font-semibold ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </div>
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Voice Analyses</CardTitle>
              <CardDescription>
                Latest content analyzed for brand voice consistency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="capitalize">
                        {analysis.contentType}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {analysis.analyzedAt.toLocaleDateString()} at {analysis.analyzedAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getScoreBadgeVariant(analysis.voiceScore)}>
                        {analysis.voiceScore}% match
                      </Badge>
                      {analysis.suggestions > 0 && (
                        <div className="flex items-center text-sm text-amber-600">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          {analysis.suggestions} suggestion{analysis.suggestions !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analyzer">
          <ContentVoiceAnalyzer profiles={mockProfiles} />
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Voice Profiles</h3>
              <p className="text-sm text-gray-600">Manage your brand voice profiles and configurations</p>
            </div>
            <Button onClick={() => setProfileModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProfiles.map((profile) => (
              <Card key={profile.id} className={`cursor-pointer transition-all hover:shadow-md ${profile.isActive ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {profile.isActive ? (
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{profile.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span className={`font-semibold ${getScoreColor(profile.averageScore)}`}>
                        {profile.averageScore}%
                      </span>
                    </div>
                    <Progress value={profile.averageScore} />
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{profile.analysisCount} analyses</span>
                      <span>{profile.consistency}% consistent</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last used: {profile.lastUsed.toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guidelines">
          <VoiceGuidelinesPanel profileId={selectedProfile?.id} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <BrandVoiceProfileModal
        open={profileModalOpen}
        onOpenChange={setProfileModalOpen}
        onSuccess={() => {
          setProfileModalOpen(false);
          // Refresh profiles list
        }}
      />
    </div>
  );
}