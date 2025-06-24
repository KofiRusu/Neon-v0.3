export type MockSeoTargets = {
  primaryKeywords: string[];
  secondaryKeywords: string[];
  longTailKeywords: string[];
  excludedKeywords: string[];
  regionalFocus: string[];
  languageTargets: string[];
  featuredSnippetsTargeted: boolean;
  localSeoTargets: {
    businessListings: string[];
    gmbOptimization: boolean;
    reviewTargets: {
      platform: string;
      targetRating: number;
      reviewCount: number;
    }[];
  };
  contentTargets: {
    blogPosts: number;
    pageOptimizations: number;
    metaDescriptions: number;
    altTextUpdates: number;
  };
  technicalSeo: {
    pagespeedTarget: number; // seconds
    mobileOptimization: boolean;
    coreWebVitals: {
      lcp: string; // Largest Contentful Paint
      fid: string; // First Input Delay
      cls: string; // Cumulative Layout Shift
    };
  };
  backLinkStrategy: {
    targetDomains: string[];
    monthlyTarget: number;
    authorityScoreMin: number;
  };
  competitorAnalysis: {
    mainCompetitors: string[];
    gapKeywords: string[];
    opportunityKeywords: string[];
  };
  seasonalKeywords: {
    q1: string[];
    q2: string[];
    q3: string[];
    q4: string[];
  };
  voiceSearchOptimization: string[];
  schemaMarkup: string[];
};

const mockSeoTargets: MockSeoTargets = {
  primaryKeywords: [
    "custom neon signs",
    "LED neon signs",
    "neon wall decor",
    "event signage UAE",
    "business neon signs",
    "wedding neon signs",
    "restaurant neon signs"
  ],
  secondaryKeywords: [
    "personalized neon lights",
    "Dubai neon signs",
    "LED wall art",
    "custom lighting design",
    "neon sign maker",
    "smart neon displays",
    "energy efficient neon"
  ],
  longTailKeywords: [
    "custom neon signs for wedding Dubai",
    "LED neon signs for restaurants UAE",
    "personalized neon wall art design",
    "smart neon signs with app control",
    "energy efficient LED neon lighting",
    "custom business logo neon signs",
    "wedding backdrop neon sign rental"
  ],
  excludedKeywords: [
    "fluorescent light",
    "halogen",
    "incandescent bulbs",
    "traditional glass neon",
    "cheap neon signs",
    "disposable lighting"
  ],
  regionalFocus: [
    "Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Jeddah", "Doha",
    "London", "Manchester", "Paris", "Lyon", "Berlin", "Munich",
    "New York", "Los Angeles", "Toronto", "Sydney"
  ],
  languageTargets: ["en-US", "en-GB", "ar-AE", "fr-FR", "de-DE", "es-ES"],
  featuredSnippetsTargeted: true,
  localSeoTargets: {
    businessListings: [
      "Google My Business",
      "Bing Places",
      "Apple Maps",
      "Yelp",
      "Yellow Pages UAE",
      "Dubizzle",
      "Time Out Dubai"
    ],
    gmbOptimization: true,
    reviewTargets: [
      { platform: "Google", targetRating: 4.8, reviewCount: 200 },
      { platform: "Facebook", targetRating: 4.9, reviewCount: 150 },
      { platform: "Trustpilot", targetRating: 4.7, reviewCount: 100 }
    ]
  },
  contentTargets: {
    blogPosts: 24, // 2 per month
    pageOptimizations: 50,
    metaDescriptions: 100,
    altTextUpdates: 200
  },
  technicalSeo: {
    pagespeedTarget: 2.5,
    mobileOptimization: true,
    coreWebVitals: {
      lcp: "<2.5s",
      fid: "<100ms",
      cls: "<0.1"
    }
  },
  backLinkStrategy: {
    targetDomains: [
      "architectural sites",
      "design blogs",
      "event planning sites",
      "interior design magazines",
      "business directories",
      "local news outlets"
    ],
    monthlyTarget: 15,
    authorityScoreMin: 30
  },
  competitorAnalysis: {
    mainCompetitors: [
      "NeonSignPro",
      "LEDCraft",
      "SignGeek",
      "NeonMFG",
      "CustomNeonCo"
    ],
    gapKeywords: [
      "smart neon technology",
      "app controlled neon signs",
      "sustainable LED neon",
      "IoT neon displays"
    ],
    opportunityKeywords: [
      "neon signs middle east",
      "arabic neon calligraphy",
      "ramadan neon decorations",
      "eid neon signs"
    ]
  },
  seasonalKeywords: {
    q1: [
      "new year neon signs",
      "valentine neon decor",
      "love neon signs",
      "romantic lighting"
    ],
    q2: [
      "wedding neon signs",
      "graduation neon",
      "spring event decor",
      "ramadan neon lights"
    ],
    q3: [
      "summer party neon",
      "outdoor event signs",
      "eid neon decorations",
      "festival lighting"
    ],
    q4: [
      "christmas neon signs",
      "holiday lighting",
      "new year countdown",
      "party neon decor"
    ]
  },
  voiceSearchOptimization: [
    "where can I buy custom neon signs near me",
    "how much do LED neon signs cost",
    "best neon sign company in Dubai",
    "custom neon signs for small business"
  ],
  schemaMarkup: [
    "Product",
    "LocalBusiness",
    "Review",
    "FAQ",
    "HowTo",
    "Service",
    "Organization"
  ]
};

export default mockSeoTargets;