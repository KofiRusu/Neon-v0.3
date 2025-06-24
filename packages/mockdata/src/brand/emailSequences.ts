export type MockEmailSequences = {
  welcomeSeries: {
    step: number;
    subject: string;
    content: string;
    cta: string;
    timing: string;
  }[];
  abandonedCart: {
    step: number;
    subject: string;
    content: string;
    cta: string;
    timing: string;
    discount?: string;
  }[];
  b2bIntro: {
    step: number;
    subject: string;
    content: string;
    cta: string;
    timing: string;
    attachment?: string;
  }[];
  nurturingSequence: {
    step: number;
    subject: string;
    content: string;
    cta: string;
    timing: string;
    segmentation: string;
  }[];
  winbackCampaign: {
    step: number;
    subject: string;
    content: string;
    cta: string;
    timing: string;
    incentive?: string;
  }[];
  eventMarketing: {
    preEvent: {
      subject: string;
      content: string;
      timing: string;
    }[];
    postEvent: {
      subject: string;
      content: string;
      timing: string;
    };
  };
  seasonalCampaigns: {
    campaign: string;
    subject: string;
    content: string;
    timing: string;
    offer: string;
  }[];
};

const mockEmailSequences: MockEmailSequences = {
  welcomeSeries: [
    {
      step: 1,
      subject: "✨ Welcome to NeonHub - Your Creative Journey Begins!",
      content: "Hi {{firstName}},\n\nWelcome to the NeonHub family! We're thrilled you've joined thousands of creators, businesses, and dreamers who trust us to bring their visions to life with stunning LED neon signs.\n\nAs a new member, here's what makes NeonHub special:\n• AI-powered design tools that make creation effortless\n• Premium LED technology with lifetime warranty\n• 48-hour production time (yes, really!)\n• Global shipping to your doorstep\n\nReady to create something amazing? Browse our most popular designs or start from scratch with our AI designer.",
      cta: "Start Creating Your Sign",
      timing: "Immediately after signup"
    },
    {
      step: 2,
      subject: "🎨 See Your Ideas Come to Life (Design Gallery Inside)",
      content: "{{firstName}},\n\nInspiration strikes when you see what's possible! Our customers have created incredible neon signs that transformed their spaces.\n\nFrom wedding backdrops that made guests gasp, to restaurant signs that doubled foot traffic, to home decor that became the talk of Instagram.\n\n[Gallery of customer creations]\n\nWhat will your NeonHub creation be? Wedding signage? Business branding? Personal wall art?\n\nP.S. Use code WELCOME15 for 15% off your first order!",
      cta: "Browse Customer Gallery",
      timing: "2 days after signup"
    },
    {
      step: 3,
      subject: "💡 Your FREE Design Consultation Awaits",
      content: "{{firstName}},\n\nStill deciding on your perfect neon sign? We get it - with endless possibilities, sometimes you need expert guidance.\n\nThat's why we're offering you a complimentary 15-minute design consultation with our creative team. They'll help you:\n✓ Refine your concept\n✓ Choose the perfect size and colors\n✓ Optimize for your space\n✓ Answer any technical questions\n\nBooked over 500 consultations this month - spots fill up fast!\n\nBonus: Book by Friday and get a free mounting kit ($25 value).",
      cta: "Book Free Consultation",
      timing: "5 days after signup"
    }
  ],
  abandonedCart: [
    {
      step: 1,
      subject: "🛒 Don't Let Your Perfect Sign Slip Away",
      content: "Hi {{firstName}},\n\nWe noticed you were creating something beautiful in our design studio! Your {{productName}} is still waiting in your cart, ready to transform your space.\n\nQuick reminder of what you're getting:\n• Premium LED technology (50,000+ hour lifespan)\n• Weatherproof design for indoor/outdoor use\n• Free worldwide shipping\n• Lifetime warranty\n\nYour design is reserved for 24 hours. After that, we'll need to release it back to our inventory.",
      cta: "Complete Your Order",
      timing: "2 hours after abandonment"
    },
    {
      step: 2,
      subject: "⏰ Last Chance: Your Custom Sign + 10% Off",
      content: "{{firstName}},\n\nYour custom {{productName}} is almost gone! We're holding it for just a few more hours.\n\nTo help you decide, here's 10% off your order - our way of saying thanks for choosing NeonHub.\n\nUse code: SAVE10NOW\n\n✨ What you'll get:\n• Your exact design, perfectly crafted\n• Premium LED technology\n• 48-hour production\n• Free shipping worldwide\n\nThis discount expires at midnight. Don't miss out!",
      cta: "Claim 10% Discount",
      timing: "24 hours after abandonment",
      discount: "10%"
    }
  ],
  b2bIntro: [
    {
      step: 1,
      subject: "Partnership Opportunity: Premium LED Signage for Your Clients",
      content: "Dear {{firstName}},\n\nI noticed {{companyName}} specializes in {{industry}} - your portfolio showcases incredible attention to detail and quality.\n\nNeonHub has partnered with over 200 design firms, event planners, and agencies to deliver premium LED neon signage that elevates their client projects.\n\nOur partnership program offers:\n• 25-40% trade discounts\n• Priority production scheduling\n• Dedicated account management\n• Co-marketing opportunities\n• Technical support and training\n\nWould you be interested in a brief call to explore how NeonHub could enhance your client offerings?",
      cta: "Schedule Partnership Call",
      timing: "Immediately after B2B lead capture",
      attachment: "Partnership_Overview.pdf"
    },
    {
      step: 2,
      subject: "Follow-up: NeonHub Partnership + Success Stories",
      content: "{{firstName}},\n\nFollowing up on our partnership opportunity. I wanted to share how similar businesses in {{industry}} have benefited from our collaboration:\n\n• Design Studio in London: 30% revenue increase from neon add-ons\n• Event Planning Company: Now offers neon as premium service\n• Architecture Firm: Won 3 major projects featuring our signage\n\nI've attached our partner success stories and current wholesale pricing.\n\nOpen to a quick 15-minute call this week to discuss how this could work for {{companyName}}?",
      cta: "Book Quick Call",
      timing: "4 days after first email",
      attachment: "Partner_Success_Stories.pdf"
    }
  ],
  nurturingSequence: [
    {
      step: 1,
      subject: "💡 Trending Now: AI-Designed Neon That Adapts to Your Space",
      content: "Innovation alert! Our new AI technology doesn't just design your neon sign - it optimizes it for your specific space, lighting conditions, and aesthetic preferences.\n\nSee how it works in our latest case study featuring a Dubai restaurant that increased social media mentions by 300%.",
      cta: "See AI Technology Demo",
      timing: "Weekly educational content",
      segmentation: "Technology enthusiasts"
    },
    {
      step: 2,
      subject: "🏆 Customer Spotlight: How Sarah's Wedding Sign Went Viral",
      content: "Sarah's custom wedding neon got 50K likes on Instagram and landed her on three wedding blogs. Here's the story behind the design and how you can create something equally stunning for your special day.",
      cta: "Create Your Viral Moment",
      timing: "Weekly success stories",
      segmentation: "Wedding customers"
    }
  ],
  winbackCampaign: [
    {
      step: 1,
      subject: "We Miss You! Here's 20% Off Your Next NeonHub Order",
      content: "Hi {{firstName}},\n\nIt's been a while since we've seen you at NeonHub, and we miss having you as part of our creative community!\n\nA lot has changed since your last visit:\n• New AI design tools\n• Expanded color options\n• Faster production times\n• Smart home integration\n\nTo welcome you back, enjoy 20% off your next order with code WELCOMEBACK20.\n\nWhat will you create this time?",
      cta: "Explore New Features",
      timing: "3 months after last purchase",
      incentive: "20% discount"
    }
  ],
  eventMarketing: {
    preEvent: [
      {
        subject: "🎪 Dubai Design Week: See NeonHub's Latest Innovations",
        content: "Join us at Dubai Design Week (Booth D-15) to experience our latest LED innovations, meet the team, and see exclusive designs not available online.",
        timing: "2 weeks before event"
      },
      {
        subject: "⏰ Last Day to RSVP: Exclusive NeonHub Preview Event",
        content: "Final reminder - limited spots available for tomorrow's exclusive preview of our 2024 collection. Light refreshments and live design demos included.",
        timing: "1 day before event"
      }
    ],
    postEvent: {
      subject: "Thanks for Visiting Our Booth! Special Show Offer Inside",
      content: "Thank you for stopping by our Dubai Design Week booth! As promised, here's your exclusive 25% discount code: DESIGNWEEK25. Valid until the end of the month.",
      timing: "1 day after event"
    }
  },
  seasonalCampaigns: [
    {
      campaign: "Valentine's Day",
      subject: "💕 Light Up Love: Custom Neon for Valentine's Day",
      content: "Make this Valentine's unforgettable with a personalized neon sign. From romantic quotes to couple's names, create something that glows as bright as your love.",
      timing: "4 weeks before Valentine's",
      offer: "Free heart-shaped add-on"
    },
    {
      campaign: "Ramadan",
      subject: "🌙 Illuminate Your Ramadan: Custom Arabic Calligraphy Neon",
      content: "Celebrate the holy month with beautiful Arabic calligraphy neon signs. Our master craftsmen specialize in traditional and modern Islamic designs.",
      timing: "3 weeks before Ramadan",
      offer: "15% off Arabic designs"
    },
    {
      campaign: "Wedding Season",
      subject: "💒 Wedding Season Special: Make Your Big Day Glow",
      content: "Wedding season is here! Create stunning neon backdrops, welcome signs, and dance floor lighting that your guests will never forget. Book now for peak season.",
      timing: "Start of wedding season",
      offer: "Free consultation + mounting kit"
    }
  ]
};

export default mockEmailSequences;