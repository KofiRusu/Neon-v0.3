export type MockTrendSignals = {
  regions: string[];
  mockTrends: {
    category: string;
    trend: string;
    description: string;
    region: string;
    confidenceScore: number;
    timeline: string;
    impact: string;
    keywords: string[];
    volume: number;
    growth: string;
  }[];
  seasonalTrends: {
    season: string;
    trends: {
      trend: string;
      popularity: number;
      keyMarkets: string[];
    }[];
  }[];
  emergingTrends: {
    trend: string;
    stage: string;
    regions: string[];
    potentialImpact: string;
    monitoringMetrics: string[];
  }[];
  competitorTrends: {
    competitor: string;
    trendingProducts: string[];
    marketShare: string;
    growthRate: string;
  }[];
  customerPreferences: {
    demographic: string;
    preferences: {
      style: string;
      colors: string[];
      themes: string[];
      occasions: string[];
    };
  }[];
  marketOpportunities: {
    opportunity: string;
    market: string;
    timeframe: string;
    difficulty: string;
    potentialValue: string;
  }[];
};

const mockTrendSignals: MockTrendSignals = {
  regions: ["UAE", "Saudi Arabia", "France", "Germany", "UK", "USA", "Canada"],
  mockTrends: [
    {
      category: "Typography",
      trend: "Bubble Bold Fonts",
      description: "Rounded, inflated typography gaining popularity in Gen Z markets",
      region: "UAE",
      confidenceScore: 92,
      timeline: "Next 6 months",
      impact: "High - 40% increase in searches",
      keywords: ["bubble font", "rounded neon", "thick letters", "bold typography"],
      volume: 15000,
      growth: "+67%"
    },
    {
      category: "Color",
      trend: "Electric Blue Dominance",
      description: "Bright electric blue replacing traditional neon colors",
      region: "France",
      confidenceScore: 88,
      timeline: "Current trending",
      impact: "Medium - 25% of new orders",
      keywords: ["electric blue", "bright blue", "neon blue", "cobalt"],
      volume: 22000,
      growth: "+45%"
    },
    {
      category: "Application",
      trend: "Home LED Decor",
      description: "Shift from commercial to residential lighting applications",
      region: "Germany",
      confidenceScore: 85,
      timeline: "Next 3 months",
      impact: "High - New market segment",
      keywords: ["home neon", "bedroom lighting", "living room decor", "personal space"],
      volume: 8500,
      growth: "+120%"
    },
    {
      category: "Technology",
      trend: "Smart Home Integration",
      description: "Voice-controlled and app-connected neon signs",
      region: "USA",
      confidenceScore: 79,
      timeline: "Next 12 months",
      impact: "Revolutionary - New product category",
      keywords: ["smart neon", "alexa compatible", "app controlled", "voice command"],
      volume: 5200,
      growth: "+200%"
    },
    {
      category: "Theme",
      trend: "Sustainability Messaging",
      description: "Eco-friendly and energy-efficient messaging in signage",
      region: "UK",
      confidenceScore: 82,
      timeline: "Current",
      impact: "Medium - Brand positioning",
      keywords: ["eco neon", "sustainable lighting", "green energy", "climate friendly"],
      volume: 12000,
      growth: "+35%"
    }
  ],
  seasonalTrends: [
    {
      season: "Q1 (Winter/Spring)",
      trends: [
        { trend: "New Year Motivation Quotes", popularity: 85, keyMarkets: ["USA", "UK", "Canada"] },
        { trend: "Valentine's Romantic Designs", popularity: 92, keyMarkets: ["UAE", "France", "Germany"] },
        { trend: "Ramadan Calligraphy", popularity: 78, keyMarkets: ["UAE", "Saudi Arabia"] }
      ]
    },
    {
      season: "Q2 (Spring/Summer)",
      trends: [
        { trend: "Wedding Season Signage", popularity: 95, keyMarkets: ["UAE", "France", "UK"] },
        { trend: "Graduation Celebrations", popularity: 70, keyMarkets: ["USA", "Canada"] },
        { trend: "Outdoor Event Lighting", popularity: 88, keyMarkets: ["Germany", "France"] }
      ]
    },
    {
      season: "Q3 (Summer/Fall)",
      trends: [
        { trend: "Festival and Concert Signage", popularity: 83, keyMarkets: ["UK", "Germany", "USA"] },
        { trend: "Back-to-School Motivational", popularity: 65, keyMarkets: ["USA", "Canada"] },
        { trend: "Eid Celebration Designs", popularity: 89, keyMarkets: ["UAE", "Saudi Arabia"] }
      ]
    },
    {
      season: "Q4 (Fall/Winter)",
      trends: [
        { trend: "Holiday and Christmas Themes", popularity: 98, keyMarkets: ["UK", "Germany", "USA", "Canada"] },
        { trend: "New Year Countdown Signs", popularity: 87, keyMarkets: ["UAE", "France"] },
        { trend: "Winter Wedding Themes", popularity: 75, keyMarkets: ["UAE", "UK"] }
      ]
    }
  ],
  emergingTrends: [
    {
      trend: "AR-Enhanced Neon Signs",
      stage: "Early adoption",
      regions: ["USA", "UK"],
      potentialImpact: "Game-changing - New interaction model",
      monitoringMetrics: ["Social media mentions", "Tech blog coverage", "Patent filings"]
    },
    {
      trend: "Personalized AI-Generated Designs",
      stage: "Development",
      regions: ["UAE", "Germany"],
      potentialImpact: "High - Mass customization",
      monitoringMetrics: ["User engagement", "Design completion rates", "Satisfaction scores"]
    },
    {
      trend: "Sustainable Materials",
      stage: "Growing adoption",
      regions: ["Germany", "France", "UK"],
      potentialImpact: "Market requirement",
      monitoringMetrics: ["Environmental certifications", "B2B inquiries", "Regulation changes"]
    }
  ],
  competitorTrends: [
    {
      competitor: "NeonSignPro",
      trendingProducts: ["Vintage-style signs", "Retro gaming themes"],
      marketShare: "15%",
      growthRate: "+12%"
    },
    {
      competitor: "LEDCraft",
      trendingProducts: ["Minimalist designs", "Scandinavian aesthetics"],
      marketShare: "12%",
      growthRate: "+8%"
    },
    {
      competitor: "CustomNeonCo",
      trendingProducts: ["Wedding signage", "Corporate branding"],
      marketShare: "10%",
      growthRate: "+5%"
    }
  ],
  customerPreferences: [
    {
      demographic: "Gen Z (18-25)",
      preferences: {
        style: "Bold, quirky, meme-inspired",
        colors: ["Electric Blue", "Hot Pink", "Lime Green", "Purple"],
        themes: ["Self-expression", "Social media", "Gaming", "Quotes"],
        occasions: ["Room decor", "Parties", "Content creation", "Gaming setups"]
      }
    },
    {
      demographic: "Millennials (26-35)",
      preferences: {
        style: "Minimalist, aesthetic, Instagram-worthy",
        colors: ["Warm White", "Soft Pink", "Amber", "Coral"],
        themes: ["Wellness", "Motivation", "Love", "Career"],
        occasions: ["Home decor", "Weddings", "Small business", "Events"]
      }
    },
    {
      demographic: "Business Owners (35+)",
      preferences: {
        style: "Professional, elegant, brand-focused",
        colors: ["White", "Blue", "Red", "Gold"],
        themes: ["Branding", "Welcome messages", "Business hours", "Logos"],
        occasions: ["Storefronts", "Offices", "Restaurants", "Events"]
      }
    }
  ],
  marketOpportunities: [
    {
      opportunity: "Smart Home Integration",
      market: "Tech-savvy consumers",
      timeframe: "6-12 months",
      difficulty: "High",
      potentialValue: "$2M+ annually"
    },
    {
      opportunity: "Arabic Calligraphy Specialization",
      market: "Middle East premium segment",
      timeframe: "3-6 months",
      difficulty: "Medium",
      potentialValue: "$800K annually"
    },
    {
      opportunity: "Sustainable LED Solutions",
      market: "European B2B market",
      timeframe: "12-18 months",
      difficulty: "Medium",
      potentialValue: "$1.5M annually"
    },
    {
      opportunity: "Event Rental Packages",
      market: "Event planning industry",
      timeframe: "3-6 months",
      difficulty: "Low",
      potentialValue: "$500K annually"
    }
  ]
};

export default mockTrendSignals;