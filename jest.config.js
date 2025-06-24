module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        module: 'esnext',
      },
    },
  },
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.test.ts',
    '<rootDir>/packages/**/?(*.)+(spec|test).ts',
    '<rootDir>/apps/**/__tests__/**/*.test.ts',
    '<rootDir>/apps/**/?(*.)+(spec|test).ts',
  ],
  collectCoverageFrom: [
    'packages/**/src/**/*.ts',
    'apps/**/src/**/*.ts',
    '!packages/**/src/**/*.d.ts',
    '!packages/**/src/**/*.test.ts',
    '!packages/**/src/**/*.spec.ts',
    '!apps/**/src/**/*.d.ts',
    '!apps/**/src/**/*.test.ts',
    '!apps/**/src/**/*.spec.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^@neon/types$': '<rootDir>/packages/types/src',
    '^@neon/utils$': '<rootDir>/packages/utils/src',
    '^@neon/core-agents$': '<rootDir>/packages/core-agents/src',
    '^@neon/data-model$': '<rootDir>/packages/data-model/src',
    '^@neon/reasoning-engine$': '<rootDir>/packages/reasoning-engine/src',
    '^~/(.*)$': '<rootDir>/apps/api/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
