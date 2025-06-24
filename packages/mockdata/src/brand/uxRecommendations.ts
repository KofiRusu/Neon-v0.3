export type MockUxRecommendations = {
  prefersGlassmorphism: boolean;
  primaryCTA: string;
  emptyStatesStyle: string;
  designSystem: {
    colorScheme: string;
    borderRadius: string;
    typography: {
      scale: string;
      weights: string[];
    };
    spacing: string;
    animations: {
      duration: string;
      easing: string;
      effects: string[];
    };
  };
  userFlow: {
    onboarding: string[];
    designProcess: string[];
    checkout: string[];
  };
  personalizations: {
    dashboardLayout: string;
    notificationStyle: string;
    colorPreferences: string[];
    accessibilityOptions: string[];
  };
  interactionPatterns: {
    navigation: string;
    feedback: string;
    loading: string;
    errors: string;
  };
  mobileExperience: {
    approach: string;
    keyFeatures: string[];
    gestureSupport: string[];
  };
  contentStrategy: {
    tone: string;
    copyLength: string;
    helpStyle: string;
    errorMessages: string;
  };
  trustSignals: {
    socialProof: string[];
    securityIndicators: string[];
    qualityAssurance: string[];
  };
  gamification: {
    elements: string[];
    rewards: string[];
    progression: string;
  };
};

const mockUxRecommendations: MockUxRecommendations = {
  prefersGlassmorphism: true,
  primaryCTA: "Generate Campaign",
  emptyStatesStyle: "Friendly robot mascot with glowing neon accent + encouraging CTA",
  designSystem: {
    colorScheme: "Dark mode with neon accents",
    borderRadius: "12px rounded corners for modern feel",
    typography: {
      scale: "1.25 ratio for clear hierarchy",
      weights: ["Regular 400", "Medium 500", "Bold 700"]
    },
    spacing: "8px grid system for consistency",
    animations: {
      duration: "300ms for UI, 600ms for complex transitions",
      easing: "ease-out for natural feel",
      effects: ["Fade", "Slide", "Scale", "Glow", "Neon flicker"]
    }
  },
  userFlow: {
    onboarding: [
      "Welcome screen with value proposition",
      "Business type selection",
      "Design preferences quiz",
      "AI-powered first design suggestion",
      "Account creation with social options"
    ],
    designProcess: [
      "Template gallery or custom start",
      "AI-powered design wizard",
      "Real-time preview with 3D visualization",
      "Customization panel with live updates",
      "Size and mounting options",
      "Final review and pricing"
    ],
    checkout: [
      "Design summary with image",
      "Shipping options and timeline",
      "Payment methods with trust badges",
      "Order confirmation with tracking",
      "Production updates via email/SMS"
    ]
  },
  personalizations: {
    dashboardLayout: "Customizable widget-based layout",
    notificationStyle: "Subtle toast notifications with neon glow",
    colorPreferences: ["System default", "Always dark", "Always light", "Auto-switch"],
    accessibilityOptions: [
      "High contrast mode",
      "Reduced motion",
      "Screen reader optimization",
      "Keyboard navigation",
      "Focus indicators",
      "Font size adjustment"
    ]
  },
  interactionPatterns: {
    navigation: "Persistent sidebar with contextual breadcrumbs",
    feedback: "Instant visual feedback with micro-animations",
    loading: "Skeleton screens with progress indicators",
    errors: "Inline validation with helpful suggestions"
  },
  mobileExperience: {
    approach: "Mobile-first responsive design",
    keyFeatures: [
      "Touch-optimized design tools",
      "Swipe gestures for navigation",
      "Simplified design wizard",
      "Camera integration for space visualization",
      "One-tap sharing"
    ],
    gestureSupport: [
      "Pinch to zoom on designs",
      "Swipe to browse templates",
      "Long press for context menus",
      "Pull to refresh"
    ]
  },
  contentStrategy: {
    tone: "Friendly expert - knowledgeable but approachable",
    copyLength: "Concise with expandable details",
    helpStyle: "Progressive disclosure with video tutorials",
    errorMessages: "Empathetic and solution-focused"
  },
  trustSignals: {
    socialProof: [
      "Customer review carousel",
      "Real-time order notifications",
      "Featured customer stories",
      "Social media feed integration",
      "Trust badges and certifications"
    ],
    securityIndicators: [
      "SSL badges in checkout",
      "Payment security icons",
      "Privacy policy links",
      "Money-back guarantee",
      "Secure payment processing"
    ],
    qualityAssurance: [
      "Lifetime warranty badge",
      "Quality certifications",
      "Production timeline guarantee",
      "Customer satisfaction score",
      "Before/after photo gallery"
    ]
  },
  gamification: {
    elements: [
      "Design completion progress bar",
      "Achievement badges for milestones",
      "Loyalty points system",
      "Design challenges and contests",
      "Community showcase leaderboard"
    ],
    rewards: [
      "Discount codes for achievements",
      "Exclusive template access",
      "Priority customer support",
      "Design consultation credits",
      "Referral bonus multipliers"
    ],
    progression: "Tiered membership with increasing benefits"
  }
};

export default mockUxRecommendations;