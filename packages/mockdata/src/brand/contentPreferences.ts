export type MockContentPreferences = {
  tone: string;
  voice: string;
  brandKeywords: string[];
  supportedLanguages: string[];
  doNotUseWords: string[];
  writingStyle: {
    formality: string;
    sentenceLength: string;
    paragraphStyle: string;
  };
  brandColors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  typography: {
    headings: string;
    body: string;
    emphasis: string;
  };
  contentTypes: {
    socialMedia: string;
    email: string;
    website: string;
    ads: string;
  };
  culturalConsiderations: {
    middleEast: string[];
    europe: string[];
    northAmerica: string[];
  };
  brandVoiceAttributes: string[];
  communicationGuidelines: string[];
  prohibitedContent: string[];
  preferredEmojis: string[];
  hashtagStrategy: {
    primary: string[];
    secondary: string[];
    trending: string[];
  };
};

const mockContentPreferences: MockContentPreferences = {
  tone: "Futuristic, Professional, Friendly",
  voice: "Bold yet conversational, innovative and inspiring",
  brandKeywords: [
    "neon", "automation", "AI", "custom signs", "illumination", 
    "LED technology", "smart lighting", "design innovation", 
    "energy efficient", "premium quality"
  ],
  supportedLanguages: ["English", "Arabic", "French", "German", "Spanish"],
  doNotUseWords: [
    "cheap", "generic", "manual", "outdated", "basic", 
    "simple", "ordinary", "standard", "low-cost", "traditional"
  ],
  writingStyle: {
    formality: "Professional but approachable",
    sentenceLength: "Medium - clear and impactful",
    paragraphStyle: "Scannable with bullet points and headlines"
  },
  brandColors: {
    primary: "#00FF88", // Neon Green
    secondary: "#FF0080", // Neon Pink
    accent: ["#00BFFF", "#FFD700", "#FF6600", "#8A2BE2"]
  },
  typography: {
    headings: "Futura, Helvetica Neue, sans-serif",
    body: "Inter, system-ui, sans-serif",
    emphasis: "Orbitron, monospace (for tech elements)"
  },
  contentTypes: {
    socialMedia: "Visual-first, engaging, trend-aware",
    email: "Personalized, action-oriented, valuable",
    website: "SEO-optimized, conversion-focused, informative",
    ads: "Attention-grabbing, benefit-driven, clear CTA"
  },
  culturalConsiderations: {
    middleEast: ["Respect for tradition", "Family values", "Premium positioning"],
    europe: ["Sustainability focus", "Design appreciation", "Quality emphasis"],
    northAmerica: ["Innovation leadership", "Efficiency benefits", "Customization options"]
  },
  brandVoiceAttributes: [
    "Innovative leader",
    "Trusted advisor",
    "Creative enabler",
    "Technology pioneer",
    "Customer champion"
  ],
  communicationGuidelines: [
    "Always lead with benefits, not features",
    "Use active voice for stronger impact",
    "Include social proof when possible",
    "End with clear, compelling call-to-action",
    "Maintain consistent brand personality"
  ],
  prohibitedContent: [
    "Negative comparisons to competitors",
    "Technical jargon without explanation",
    "Overly promotional language",
    "Generic stock imagery references",
    "Outdated technology mentions"
  ],
  preferredEmojis: ["💡", "✨", "🌟", "🎨", "🚀", "💎", "🔥", "⚡", "🎯", "🏆"],
  hashtagStrategy: {
    primary: [
      "#NeonHub", "#CustomNeon", "#LEDSigns", "#SmartLighting", 
      "#NeonArt", "#DesignInnovation"
    ],
    secondary: [
      "#InteriorDesign", "#EventDecor", "#BusinessSigns", "#WeddingDecor", 
      "#RestaurantDesign", "#RetailSignage"
    ],
    trending: [
      "#AIDesign", "#SustainableLighting", "#SmartHome", "#TechInnovation", 
      "#DigitalTransformation", "#CreativeDesign"
    ]
  }
};

export default mockContentPreferences;