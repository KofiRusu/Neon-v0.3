// Jest setup file for API app
// This file is executed before running tests

// Set test timeout
jest.setTimeout(30000);

// Setup test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/neonhub_test';

// Mock console methods in tests to keep output clean during testing
const originalConsole = global.console;
global.console = {
  ...console,
  // Keep errors and warnings visible for debugging
  log: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: originalConsole.warn,
  error: originalConsole.error,
};

// Global test utilities
global.testUtils = {
  // Add common test utilities here
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Mock async function
  mockAsync: (returnValue, delay = 0) =>
    jest.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(returnValue), delay))
    ),
};

// Mock external dependencies that shouldn't be called in tests
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue([{ statusCode: 202 }]),
}));

jest.mock('twilio', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({ sid: 'test-message-sid' }),
    },
  })),
}));

// Setup and cleanup for each test
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

afterEach(() => {
  // Cleanup after each test if needed
  jest.restoreAllMocks();
});

// Global cleanup
afterAll(() => {
  // Restore original console
  global.console = originalConsole;
});