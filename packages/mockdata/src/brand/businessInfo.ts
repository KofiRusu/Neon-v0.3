export type MockBusinessInfo = {
  companyName: string;
  founded: number;
  HQLocation: string;
  industry: string;
  brandTagline: string;
  contactEmail: string;
  whatsappBusiness: string;
  website: string;
  employees: number;
  annualRevenue: string;
  markets: string[];
  certifications: string[];
  businessHours: {
    timezone: string;
    weekdays: string;
    weekends: string;
  };
  socialMedia: {
    instagram: string;
    linkedin: string;
    facebook: string;
    tiktok: string;
  };
  paymentMethods: string[];
  shippingRegions: string[];
  manufacturingLocations: string[];
  keyProducts: string[];
  uniqueSellingPoints: string[];
  targetCustomers: string[];
};

const mockBusinessInfo: MockBusinessInfo = {
  companyName: "NeonHub",
  founded: 2021,
  HQLocation: "Dubai, UAE",
  industry: "LED & Custom Neon Signage",
  brandTagline: "Illuminate the World. Effortlessly.",
  contactEmail: "info@neonhub.ai",
  whatsappBusiness: "+971-50-NEONHUB",
  website: "https://neonhub.ai",
  employees: 45,
  annualRevenue: "$2.8M",
  markets: ["UAE", "Saudi Arabia", "Qatar", "UK", "Germany", "France", "USA"],
  certifications: ["ISO 9001", "CE Marking", "RoHS", "FCC", "Energy Star"],
  businessHours: {
    timezone: "GMT+4 (GST)",
    weekdays: "08:00 - 18:00",
    weekends: "10:00 - 16:00"
  },
  socialMedia: {
    instagram: "@neonhub.official",
    linkedin: "company/neonhub-ai",
    facebook: "NeonHubOfficial",
    tiktok: "@neonhub.viral"
  },
  paymentMethods: ["Credit Card", "PayPal", "Bank Transfer", "Crypto", "Buy Now Pay Later"],
  shippingRegions: ["GCC", "Europe", "North America", "Australia"],
  manufacturingLocations: ["Dubai", "Shenzhen", "Munich"],
  keyProducts: [
    "Custom Neon Signs",
    "LED Wall Art",
    "Event Signage",
    "Business Logos",
    "Wedding Decor",
    "Restaurant Signs",
    "Smart Neon Displays"
  ],
  uniqueSellingPoints: [
    "AI-powered design automation",
    "48-hour production time",
    "Lifetime warranty",
    "Energy-efficient LED technology",
    "Mobile app visualization",
    "Global shipping network"
  ],
  targetCustomers: [
    "Interior Designers",
    "Event Planners",
    "Restaurant Owners",
    "Retail Stores",
    "Wedding Planners",
    "Real Estate Developers",
    "Corporate Offices"
  ]
};

export default mockBusinessInfo;