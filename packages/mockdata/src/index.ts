// NeonHub Mockdata - Brand-specific placeholder data
// This package provides comprehensive mock data for development and testing

// Import all mock data
import mockBusinessInfo from './brand/businessInfo';
import mockContentPreferences from './brand/contentPreferences';
import mockCampaignGoals from './brand/campaignGoals';
import mockSeoTargets from './brand/seoTargets';
import mockEmailSequences from './brand/emailSequences';
import mockB2bOutreach from './brand/b2bOutreach';
import mockTrendSignals from './brand/trendSignals';
import mockUxRecommendations from './brand/uxRecommendations';

// Export individual modules
export { default as mockBusinessInfo } from './brand/businessInfo';
export type { MockBusinessInfo } from './brand/businessInfo';

export { default as mockContentPreferences } from './brand/contentPreferences';
export type { MockContentPreferences } from './brand/contentPreferences';

export { default as mockCampaignGoals } from './brand/campaignGoals';
export type { MockCampaignGoals } from './brand/campaignGoals';

export { default as mockSeoTargets } from './brand/seoTargets';
export type { MockSeoTargets } from './brand/seoTargets';

export { default as mockEmailSequences } from './brand/emailSequences';
export type { MockEmailSequences } from './brand/emailSequences';

export { default as mockB2bOutreach } from './brand/b2bOutreach';
export type { MockB2bOutreach } from './brand/b2bOutreach';

export { default as mockTrendSignals } from './brand/trendSignals';
export type { MockTrendSignals } from './brand/trendSignals';

export { default as mockUxRecommendations } from './brand/uxRecommendations';
export type { MockUxRecommendations } from './brand/uxRecommendations';

// Consolidated export for easy access
export const mockData = {
  businessInfo: mockBusinessInfo,
  contentPreferences: mockContentPreferences,
  campaignGoals: mockCampaignGoals,
  seoTargets: mockSeoTargets,
  emailSequences: mockEmailSequences,
  b2bOutreach: mockB2bOutreach,
  trendSignals: mockTrendSignals,
  uxRecommendations: mockUxRecommendations
};

// Type definitions for the consolidated object
export type MockData = typeof mockData;