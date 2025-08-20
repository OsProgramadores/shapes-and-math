module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/js/shapes-and-math/__tests__/**/*.test.js'],
  moduleNameMapper: {
    '^js/(.*)$': '<rootDir>/js/$1'
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  rootDir: '.',
  // Setup file
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Clear mocks between tests
  clearMocks: true,
  // Reset modules between tests  
  resetModules: true,
  // Verbose output for better debugging
  verbose: true,
};
