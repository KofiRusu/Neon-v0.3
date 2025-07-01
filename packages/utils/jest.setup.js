// Jest setup file for utils package

// Set test timeout
jest.setTimeout(30000);

// Setup test environment variables
process.env.NODE_ENV = 'test';

// Mock Prisma database for testing
jest.mock('@neon/data-model', () => ({
  db: {
    aIEventLog: {
      create: jest.fn().mockResolvedValue({ id: 'test-id' }),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue({ id: 'test-id' }),
      delete: jest.fn().mockResolvedValue({ id: 'test-id' }),
    },
  },
}));

// Global test utilities
global.testUtils = {
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  mockAsync: (returnValue, delay = 0) =>
    jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(returnValue), delay))
    ),
};

// Setup and cleanup for each test
beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});