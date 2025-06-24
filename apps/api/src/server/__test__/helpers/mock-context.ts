import { jest } from '@jest/globals';

// Mock Prisma client interface
interface MockPrismaClient {
  user: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  agent: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  agentExecution: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  campaign: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  content: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  analytics: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
    aggregate: jest.Mock;
    groupBy: jest.Mock;
  };
  lead: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  trend: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  abTest: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  designTemplate: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  $transaction: jest.Mock;
  $connect: jest.Mock;
  $disconnect: jest.Mock;
}

interface MockSession {
  user: MockUser;
  expires: Date;
}

interface MockLogger {
  info: jest.Mock;
  error: jest.Mock;
  warn: jest.Mock;
  debug: jest.Mock;
}

// Mock context type based on expected tRPC context structure
interface MockContext {
  prisma: MockPrismaClient;
  session: MockSession | null;
  logger: MockLogger;
}

interface MockUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MockAgent {
  id: string;
  name: string;
  type: string;
  status: string;
  capabilities: Record<string, unknown>;
  settings: Record<string, unknown>;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MockCampaign {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MockExecution {
  id: string;
  agentId: string;
  campaignId: string;
  userId: string;
  task: string;
  payload: Record<string, unknown>;
  result: unknown;
  status: string;
  performance: unknown;
  error: unknown;
  startedAt: Date;
  completedAt: Date | null;
  metadata: Record<string, unknown>;
}

export function createTRPCMockContext(): MockContext {
  return {
    prisma: {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      agent: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      agentExecution: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      campaign: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      content: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      analytics: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
        aggregate: jest.fn(),
        groupBy: jest.fn(),
      },
      lead: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      trend: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      abTest: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      designTemplate: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(),
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    },
    session: null,
    logger: {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    },
  };
}

export function createMockUser(): MockUser {
  return {
    id: 'user1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createMockSession(user = createMockUser()): MockSession {
  return {
    user,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
  };
}

export function createMockAgent(): MockAgent {
  return {
    id: 'agent1',
    name: 'Test Agent',
    type: 'CONTENT',
    status: 'ACTIVE',
    capabilities: {},
    settings: {},
    version: '1.0.0',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createMockCampaign(): MockCampaign {
  return {
    id: 'campaign1',
    name: 'Test Campaign',
    description: 'Test campaign description',
    type: 'SOCIAL_MEDIA',
    status: 'ACTIVE',
    budget: 1000,
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function createMockExecution(): MockExecution {
  return {
    id: 'execution1',
    agentId: 'agent1',
    campaignId: 'campaign1',
    userId: 'user1',
    task: 'test_task',
    payload: {},
    result: null,
    status: 'PENDING',
    performance: null,
    error: null,
    startedAt: new Date(),
    completedAt: null,
    metadata: {},
  };
}