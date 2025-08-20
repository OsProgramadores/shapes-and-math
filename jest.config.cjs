module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/js/shapes-and-math/__tests__/**/*.js'],
  moduleNameMapper: {
    '^\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^js/(.*)$': '<rootDir>/js/$1'
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  transform: {},
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  rootDir: '.',
  moduleDirectories: ['node_modules', 'js'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
