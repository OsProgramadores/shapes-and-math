export default {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/js/src/$1',
    '^js/(.*)$': '<rootDir>/js/$1',
  },
  modulePaths: ['<rootDir>/js/src'],
  testMatch: [
    '**/tests/unit/**/*.test.js',
  ],
  transform: {},
  transformIgnorePatterns: [
    '/node_modules/(?!(.*)/)',
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: false,
  collectCoverageFrom: [
    'js/src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  // Handle ESM modules
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  // Setup for global test environment
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // Reset mocks between tests
  resetMocks: true,
  // Clear mock calls between tests
  clearMocks: true,
  // Reset modules between tests to avoid state leakage
  resetModules: true,
  // Run tests with verbose output
  verbose: true,
};
