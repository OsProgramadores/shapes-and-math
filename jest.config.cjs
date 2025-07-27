module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/js/shapes-and-math/__tests__/**/*.js'],
  moduleNameMapper: {
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
    '^js/(.*)$': '<rootDir>/js/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(your-module-to-transform)/)'
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  rootDir: '.',
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'js'],
  // ES modules are already enabled via package.json "type": "module"
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
