<!-- AUTO-GENERATED DOCS: 2025-06-20T23:48:34.742Z -->

# 🚀 NeonHub v0.3 - AI Marketing Automation Platform

[![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)](https://github.com/KofiRusu/Neon-v0.3)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg)](https://nextjs.org/)
[![CI](https://github.com/KofiRusu/Neon-v0.3/actions/workflows/ci.yml/badge.svg)](https://github.com/KofiRusu/Neon-v0.3/actions)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)

> **The most advanced AI-powered marketing automation platform built with modern web technologies**

![NeonHub Dashboard](https://via.placeholder.com/800x400/1e293b/00d4aa?text=NeonHub+v0.3+Dashboard)

---

## 🎯 **What is NeonHub?**

NeonHub v0.3 is a comprehensive marketing automation platform that leverages AI agents to handle every aspect of your marketing operations:

- **🤖 9 Specialized AI Agents** for content, SEO, email, social media, and support
- **📊 Real-time Analytics** with comprehensive performance tracking
- **🔄 Automated Workflows** for campaign management and optimization
- **🎨 Modern Dashboard** with intuitive agent management
- **⚡ Production-Ready** architecture with enterprise-grade reliability

---

## ✨ **Key Features**

### 🧠 **AI Agent Ecosystem**
| Agent | Purpose | Status |
|-------|---------|--------|
| **ContentAgent** | Blog posts, social content, email copy | ✅ Production |
| **SEOAgent** | Meta tags, keyword optimization, rankings | ✅ Production |
| **EmailAgent** | Campaign automation, drip sequences | ✅ Production |
| **SocialAgent** | Multi-platform posting, scheduling | ✅ Production |
| **SupportAgent** | WhatsApp automation, ticket management | ✅ Production |
| **CampaignAgent** | End-to-end campaign orchestration | ✅ Production |
| **MetricsAgent** | Performance analytics, reporting | ✅ Production |
| **UserAgent** | User management, authentication | ✅ Production |
| **CoordinatorAgent** | Inter-agent communication | ✅ Production |

### 🏗️ **Technical Architecture**
- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: tRPC + Next.js API routes + Prisma ORM
- **Database**: PostgreSQL with 19+ optimized tables
- **Type Safety**: End-to-end TypeScript with Zod validation
- **State Management**: React Query + tRPC for seamless data flow

### 📱 **Dashboard Features**
- **Agent Management** - Monitor and control all AI agents
- **Campaign Builder** - Visual campaign creation and management
- **Analytics Hub** - Real-time performance metrics and insights
- **Content Studio** - AI-powered content generation tools
- **Communication Center** - Unified inbox for all channels

---

## 🚀 **Quick Start**

### Prerequisites
```bash
Node.js 18.17+ • PostgreSQL 15+ • Git
```

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/KofiRusu/Neon-v0.3.git
cd Neon-v0.3

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# 4. Initialize database
npm run db:push
npm run db:generate

# 5. Start development servers
npm run dev
```

### Access Points
- **Dashboard**: http://localhost:3000
- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

---

## 📁 **Project Structure**

```
neon-v0.3/
├── 📱 apps/
│   ├── api/              # Next.js API server
│   │   ├── src/app/api/  # API routes
│   │   └── src/server/   # tRPC routers
│   └── dashboard/        # React dashboard
│       ├── src/app/      # Next.js pages
│       └── src/components/ # React components
├── 📦 packages/
│   ├── core-agents/      # AI agent implementations
│   ├── data-model/       # Prisma schema & client
│   ├── types/           # Shared TypeScript types
│   ├── utils/           # Utility functions
│   └── reasoning-engine/ # AI reasoning logic
├── 🧪 tests/
│   ├── e2e/             # End-to-end tests
│   └── integration/     # Integration tests
└── 📚 docs/             # Documentation
```

---

## 🛠️ **Development**

### Available Scripts
```bash
npm run dev          # Start development servers
npm run build        # Build for production
npm run start        # Start production servers
npm run test         # Run all tests
npm run test:e2e     # Run E2E tests
npm run lint         # Lint all workspaces
npm run type-check   # TypeScript type checking
npm run db:studio    # Open Prisma Studio
```

### Development Workflow
1. **Backend Changes**: Edit files in `apps/api/src/`
2. **Frontend Changes**: Edit files in `apps/dashboard/src/`
3. **Agent Logic**: Modify `packages/core-agents/src/`
4. **Database Schema**: Update `packages/data-model/prisma/schema.prisma`

---

## 🚀 **Deployment**

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Docker
```bash
docker-compose up -d --build
```

### Option 3: Traditional Server
```bash
npm run build
npm run start
```

### Environment Variables
```bash
# Required
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXT_PUBLIC_API_URL="https://your-api-domain.com/api/trpc"

# Optional
OPENAI_API_KEY="your_openai_key"
STRIPE_SECRET_KEY="your_stripe_key"
```

---

## 📊 **API Documentation**

### tRPC Routers
- **`user.*`** - User management and authentication
- **`campaign.*`** - Campaign CRUD operations
- **`metrics.*`** - Analytics and performance data
- **`agent.*`** - AI agent management
- **`content.*`** - Content generation endpoints
- **`seo.*`** - SEO optimization tools
- **`email.*`** - Email marketing automation
- **`social.*`** - Social media management
- **`support.*`** - Customer support features

### Example Usage
```typescript
// Frontend tRPC client usage
const { data: campaigns } = trpc.campaign.getAll.useQuery();
const createCampaign = trpc.campaign.create.useMutation();

// Create new campaign
await createCampaign.mutateAsync({
  name: "Summer 2024 Campaign",
  type: "SOCIAL_MEDIA",
  budget: 5000
});
```

---

## 🧪 **Testing**

### Test Coverage
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API endpoint and database testing
- **E2E Tests**: Full user workflow testing with Playwright

### Running Tests
```bash
npm run test              # All tests
npm run test:e2e          # End-to-end tests only
npm run test --workspace=apps/api  # API tests only
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 **Support**

- **Documentation**: [Full docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/KofiRusu/Neon-v0.3/issues)
- **Discussions**: [GitHub Discussions](https://github.com/KofiRusu/Neon-v0.3/discussions)

---

## 🙏 **Acknowledgments**

Built with amazing open-source technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with types

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[Live Demo](https://neonhub-v3-demo.vercel.app) • [Documentation](./docs/) • [Contributing](CONTRIBUTING.md)

</div>
