export type MockB2bOutreach = {
  mockLeads: {
    companyName: string;
    industry: string;
    region: string;
    employees: string;
    revenue: string;
    contactPerson: string;
    title: string;
    email: string;
    leadScore: number;
    painPoints: string[];
    potentialValue: string;
  }[];
  sampleColdEmails: {
    subject: string;
    content: string;
    industry: string;
    personalizedElements: string[];
  }[];
  pdfOffers: {
    title: string;
    description: string;
    targetAudience: string;
    keyPoints: string[];
    callToAction: string;
  }[];
  followUpSequences: {
    sequence: string;
    emails: {
      timing: string;
      subject: string;
      content: string;
    }[];
  }[];
  partnershipTiers: {
    tier: string;
    benefits: string[];
    requirements: string[];
    discountRange: string;
  }[];
};

const mockB2bOutreach: MockB2bOutreach = {
  mockLeads: [
    {
      companyName: "Luxe Events Dubai",
      industry: "Event Planning",
      region: "UAE",
      employees: "25-50",
      revenue: "$2M+",
      contactPerson: "Sarah Al-Rashid",
      title: "Creative Director",
      email: "sarah@luxeevents.ae",
      leadScore: 92,
      painPoints: ["High-end client expectations", "Unique decoration needs", "Tight event timelines"],
      potentialValue: "$25,000/year"
    },
    {
      companyName: "Architectural Visions Ltd",
      industry: "Architecture & Design",
      region: "London, UK",
      employees: "50-100",
      revenue: "$5M+",
      contactPerson: "James Morrison",
      title: "Senior Partner",
      email: "j.morrison@archvisions.co.uk",
      leadScore: 87,
      painPoints: ["Client differentiation", "Lighting integration", "Sustainable design"],
      potentialValue: "$40,000/year"
    },
    {
      companyName: "Gastronomy Group",
      industry: "Restaurant Chain",
      region: "Germany",
      employees: "200+",
      revenue: "$15M+",
      contactPerson: "Klaus Weber",
      title: "Brand Manager",
      email: "k.weber@gastronomy-group.de",
      leadScore: 85,
      painPoints: ["Brand consistency", "Cost-effective signage", "Multi-location rollout"],
      potentialValue: "$60,000/year"
    },
    {
      companyName: "Premier Real Estate",
      industry: "Real Estate Development",
      region: "Toronto, Canada",
      employees: "100-200",
      revenue: "$25M+",
      contactPerson: "Maria Rodriguez",
      title: "Marketing Director",
      email: "maria@premierrealestate.ca",
      leadScore: 78,
      painPoints: ["Property differentiation", "Sales center appeal", "Budget constraints"],
      potentialValue: "$35,000/year"
    },
    {
      companyName: "Digital Nomad Spaces",
      industry: "Co-working",
      region: "Barcelona, Spain",
      employees: "10-25",
      revenue: "$1M+",
      contactPerson: "Carlos Mendez",
      title: "Founder & CEO",
      email: "carlos@digitalnomadspaces.es",
      leadScore: 73,
      painPoints: ["Inspiring work environment", "Instagram-worthy spaces", "Community building"],
      potentialValue: "$15,000/year"
    }
  ],
  sampleColdEmails: [
    {
      subject: "Transform Your Events with Custom LED Signage",
      content: "Hi {{firstName}},\n\nI came across {{companyName}}'s recent work on the {{recentProject}} - absolutely stunning! The attention to detail in your event design is remarkable.\n\nI'm reaching out because we've helped similar event planning companies in the Middle East create truly memorable experiences with custom LED neon signage. For instance, one Dubai-based planner saw a 40% increase in client referrals after incorporating our signature lighting elements.\n\nOur AI-powered design system can create:\n• Custom welcome signs that match your event themes\n• Instagram-worthy photo backdrops\n• Elegant table lighting and centerpieces\n• Branded signage that elevates your portfolio\n\nWould you be interested in a brief call to see how we could enhance your upcoming projects?",
      industry: "Event Planning",
      personalizedElements: ["Recent project mention", "Regional relevance", "Industry-specific benefits"]
    },
    {
      subject: "Innovative Lighting Solutions for Your Next Architectural Project",
      content: "Dear {{firstName}},\n\nYour firm's work on {{recentProject}} caught my attention - particularly the innovative use of lighting to enhance the building's character. It's clear that {{companyName}} understands how lighting can transform architectural spaces.\n\nNeonHub has partnered with architects across Europe to integrate smart LED neon elements that:\n• Enhance building facades and interiors\n• Provide energy-efficient, long-lasting illumination\n• Offer customizable colors and patterns\n• Meet sustainability standards\n\nOur technology allows for seamless integration into architectural designs, and we've worked on projects ranging from luxury residences to commercial complexes.\n\nI'd love to share some case studies of how we've collaborated with architectural firms. Would you have 15 minutes for a brief call this week?",
      industry: "Architecture",
      personalizedElements: ["Portfolio analysis", "Sustainability focus", "Technical integration"]
    }
  ],
  pdfOffers: [
    {
      title: "NeonHub Global Reseller Pack",
      description: "Comprehensive partnership guide for design professionals and agencies",
      targetAudience: "Design firms, event planners, architects",
      keyPoints: [
        "25-40% trade discounts",
        "Priority production scheduling",
        "Dedicated account management",
        "Co-marketing opportunities",
        "Technical support and training",
        "Case studies and success stories"
      ],
      callToAction: "Schedule Partnership Call"
    },
    {
      title: "LED Neon Technology Guide",
      description: "Technical specifications and installation guide for professionals",
      targetAudience: "Architects, contractors, designers",
      keyPoints: [
        "Energy efficiency comparisons",
        "Installation requirements",
        "Maintenance and warranty info",
        "Compliance and certifications",
        "Design considerations",
        "Cost analysis tools"
      ],
      callToAction: "Request Technical Consultation"
    },
    {
      title: "Restaurant Signage Success Stories",
      description: "Case studies of successful restaurant branding with LED neon",
      targetAudience: "Restaurant owners, hospitality groups",
      keyPoints: [
        "5 detailed case studies",
        "ROI analysis and metrics",
        "Before/after transformations",
        "Customer testimonials",
        "Design templates",
        "Implementation timeline"
      ],
      callToAction: "Start Your Transformation"
    }
  ],
  followUpSequences: [
    {
      sequence: "Cold Email Follow-up",
      emails: [
        {
          timing: "3 days after initial email",
          subject: "Quick question about {{companyName}}'s lighting needs",
          content: "Hi {{firstName}}, I know you're busy, so I'll keep this brief. Did you have a chance to review my email about custom LED signage for your projects? I'd be happy to send over some relevant case studies if you're interested."
        },
        {
          timing: "1 week after initial email",
          subject: "One last thought for {{companyName}}",
          content: "{{firstName}}, I don't want to keep bothering you, but I thought you might be interested in this case study of how we helped a similar {{industry}} company increase their project value by 20% with custom lighting solutions. No pressure - just thought it might be relevant."
        }
      ]
    }
  ],
  partnershipTiers: [
    {
      tier: "Preferred Partner",
      benefits: ["25% discount", "Priority support", "Marketing materials"],
      requirements: ["$10K annual commitment", "Brand guidelines compliance"],
      discountRange: "20-25%"
    },
    {
      tier: "Elite Partner",
      benefits: ["35% discount", "Dedicated account manager", "Co-marketing opportunities", "Training programs"],
      requirements: ["$25K annual commitment", "Showcase partnership", "Referral program participation"],
      discountRange: "30-35%"
    },
    {
      tier: "Strategic Partner",
      benefits: ["40% discount", "Custom product development", "Joint marketing campaigns", "Exclusive territory rights"],
      requirements: ["$50K annual commitment", "Marketing investment", "Sales training completion"],
      discountRange: "35-40%"
    }
  ]
};

export default mockB2bOutreach;