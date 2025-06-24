# @neonhub/mockdata

Comprehensive mock data package for NeonHub AI platform development and testing.

## Overview

This package provides realistic, brand-specific mock data for all NeonHub business modules. It serves as placeholder data during development and can be easily replaced with real client data when available.

## Installation

```bash
npm install @neonhub/mockdata
```

## Usage

### Individual Imports

```typescript
import { mockBusinessInfo, mockContentPreferences } from '@neonhub/mockdata';

// Use specific mock data
console.log(mockBusinessInfo.companyName); // "NeonHub"
console.log(mockContentPreferences.tone); // "Futuristic, Professional, Friendly"
```

### Consolidated Import

```typescript
import { mockData } from '@neonhub/mockdata';

// Access all mock data from single object
const businessName = mockData.businessInfo.companyName;
const campaignGoals = mockData.campaignGoals.b2cGoals;
```

### With TypeScript

```typescript
import { 
  mockBusinessInfo, 
  type MockBusinessInfo,
  mockCampaignGoals,
  type MockCampaignGoals 
} from '@neonhub/mockdata';

// Use with proper typing
const processBusinessInfo = (info: MockBusinessInfo) => {
  // Your logic here
};

processBusinessInfo(mockBusinessInfo);
```

## Available Mock Data

### 📊 Business Information (`mockBusinessInfo`)
- Company details (name, location, industry)
- Business hours and contact information
- Target markets and certifications
- Social media handles
- Key products and USPs

### 🎨 Content Preferences (`mockContentPreferences`)
- Brand voice and tone guidelines
- Supported languages and keywords
- Typography and color preferences
- Cultural considerations by region
- Content strategy by channel

### 🎯 Campaign Goals (`mockCampaignGoals`)
- B2C and B2B revenue targets
- KPI benchmarks and metrics
- Channel-specific goals
- Budget allocation strategies
- Timeframe objectives

### 🔍 SEO Targets (`mockSeoTargets`)
- Primary and secondary keywords
- Regional and language targeting
- Local SEO optimization
- Technical SEO requirements
- Competitor analysis

### 📧 Email Sequences (`mockEmailSequences`)
- Welcome series templates
- Abandoned cart recovery
- B2B outreach sequences
- Seasonal campaigns
- Win-back campaigns

### 🤝 B2B Outreach (`mockB2bOutreach`)
- Lead profiles and scoring
- Cold email templates
- Partnership tiers
- PDF offer descriptions
- Follow-up sequences

### 📈 Trend Signals (`mockTrendSignals`)
- Regional trend analysis
- Emerging market opportunities
- Competitor intelligence
- Customer preferences by demographic
- Seasonal trend patterns

### 🎨 UX Recommendations (`mockUxRecommendations`)
- Design system preferences
- User flow optimization
- Personalization options
- Mobile experience guidelines
- Accessibility considerations

## Example Usage in Components

### React Component

```typescript
import React from 'react';
import { mockBusinessInfo, mockContentPreferences } from '@neonhub/mockdata';

const BusinessProfile: React.FC = () => {
  return (
    <div>
      <h1>{mockBusinessInfo.companyName}</h1>
      <p>{mockBusinessInfo.brandTagline}</p>
      <p>Founded: {mockBusinessInfo.founded}</p>
      <p>Tone: {mockContentPreferences.tone}</p>
      <p>Markets: {mockBusinessInfo.markets.join(', ')}</p>
    </div>
  );
};
```

### API Route

```typescript
import { mockCampaignGoals } from '@neonhub/mockdata';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use mock data for development
  const campaignData = mockCampaignGoals.b2cGoals;
  
  res.status(200).json({
    revenue: campaignData.monthlyRevenue,
    aov: campaignData.aov,
    targets: campaignData.seasonalTargets
  });
}
```

### Testing

```typescript
import { mockEmailSequences } from '@neonhub/mockdata';

describe('Email Campaign Service', () => {
  it('should process welcome series', () => {
    const welcomeEmails = mockEmailSequences.welcomeSeries;
    
    expect(welcomeEmails).toHaveLength(3);
    expect(welcomeEmails[0].subject).toContain('Welcome');
    expect(welcomeEmails[0].timing).toBe('Immediately after signup');
  });
});
```

## Data Structure

All mock data follows consistent TypeScript interfaces:

```typescript
// Example structure
export type MockBusinessInfo = {
  companyName: string;
  founded: number;
  HQLocation: string;
  // ... other properties
};

export type MockContentPreferences = {
  tone: string;
  voice: string;
  brandKeywords: string[];
  // ... other properties
};
```

## Replacing with Real Data

When real client data becomes available, simply replace the mock data:

```typescript
// Before (using mock data)
import { mockBusinessInfo } from '@neonhub/mockdata';

// After (using real data)
import { realBusinessInfo } from '@neonhub/client-data';
```

## Development

### Building the Package

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Testing

```bash
npm test
```

## Contributing

When adding new mock data:

1. Create TypeScript interfaces for all data structures
2. Use realistic, brand-appropriate data
3. Follow existing naming conventions
4. Update the main index.ts export
5. Add usage examples to README

## License

MIT - See LICENSE file for details.

---

**Note**: This mock data is for development purposes only. Replace with actual client data before production deployment.