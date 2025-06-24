export type MockCampaignGoals = {
  b2cGoals: {
    revenueTarget: string;
    monthlyRevenue: string;
    aov: string;
    regionFocus: string;
    customerAcquisitionTarget: number;
    retentionRate: string;
    seasonalTargets: {
      q1: string;
      q2: string;
      q3: string;
      q4: string;
    };
  };
  b2bGoals: {
    distributors: number;
    leadScoreThreshold: number;
    averageDealSize: string;
    salesCycleTarget: string;
    partnershipGoals: number;
    territoryExpansion: string[];
  };
  performanceMetrics: string[];
  kpiTargets: {
    conversionRate: string;
    ctr: string;
    roas: string;
    cpa: string;
    ltv: string;
    churnRate: string;
  };
  channelGoals: {
    socialMedia: {
      followers: number;
      engagement: string;
      hashtagReach: number;
    };
    email: {
      listGrowth: string;
      openRate: string;
      clickRate: string;
    };
    seo: {
      organicTraffic: string;
      keywordRankings: number;
      backlinks: number;
    };
    ppc: {
      impressions: number;
      cpc: string;
      qualityScore: number;
    };
  };
  timeframes: {
    shortTerm: string; // 3 months
    mediumTerm: string; // 6 months
    longTerm: string; // 12 months
  };
  budgetAllocation: {
    socialMedia: string;
    searchAds: string;
    emailMarketing: string;
    contentCreation: string;
    influencerPartnerships: string;
    retargeting: string;
  };
  competitorBenchmarks: {
    marketShare: string;
    brandAwareness: string;
    customerSatisfaction: string;
  };
};

const mockCampaignGoals: MockCampaignGoals = {
  b2cGoals: {
    revenueTarget: "$1.5M annually",
    monthlyRevenue: "$120,000/month",
    aov: "$88",
    regionFocus: "UAE (40%), EU (35%), NA (25%)",
    customerAcquisitionTarget: 850,
    retentionRate: "75%",
    seasonalTargets: {
      q1: "$280K (New Year, Valentine's)",
      q2: "$320K (Wedding season)",
      q3: "$380K (Summer events)",
      q4: "$520K (Holiday season)"
    }
  },
  b2bGoals: {
    distributors: 50,
    leadScoreThreshold: 80,
    averageDealSize: "$15,000",
    salesCycleTarget: "45 days",
    partnershipGoals: 25,
    territoryExpansion: ["KSA", "Kuwait", "Bahrain", "Netherlands", "Belgium"]
  },
  performanceMetrics: [
    "Revenue Growth Rate",
    "Customer Acquisition Cost (CAC)",
    "Lifetime Value (LTV)",
    "Return on Ad Spend (ROAS)",
    "Conversion Rate",
    "Click-Through Rate (CTR)",
    "Brand Awareness Score",
    "Net Promoter Score (NPS)"
  ],
  kpiTargets: {
    conversionRate: "3.2%",
    ctr: "2.8%",
    roas: "4.5:1",
    cpa: "$28",
    ltv: "$320",
    churnRate: "<5%"
  },
  channelGoals: {
    socialMedia: {
      followers: 75000,
      engagement: "6.5%",
      hashtagReach: 500000
    },
    email: {
      listGrowth: "15% monthly",
      openRate: "28%",
      clickRate: "4.2%"
    },
    seo: {
      organicTraffic: "+45%",
      keywordRankings: 150, // Top 10 rankings
      backlinks: 250
    },
    ppc: {
      impressions: 2500000,
      cpc: "$0.85",
      qualityScore: 8
    }
  },
  timeframes: {
    shortTerm: "Establish brand presence, initial customer acquisition",
    mediumTerm: "Scale operations, expand to new markets",
    longTerm: "Market leadership, international expansion"
  },
  budgetAllocation: {
    socialMedia: "30%",
    searchAds: "25%",
    emailMarketing: "15%",
    contentCreation: "20%",
    influencerPartnerships: "5%",
    retargeting: "5%"
  },
  competitorBenchmarks: {
    marketShare: "Target 8% of premium neon market",
    brandAwareness: "Top 3 in regional search results",
    customerSatisfaction: "4.8+ star average rating"
  }
};

export default mockCampaignGoals;