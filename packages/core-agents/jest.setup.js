// Jest setup file for core-agents package

// Set test timeout
jest.setTimeout(30000);

// Setup test environment variables
process.env.NODE_ENV = 'test';

// Mock external dependencies
jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Test response' } }],
        }),
      },
    },
  })),
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