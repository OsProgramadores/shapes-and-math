// Custom test runner using @babel/register for ESM support
require('@babel/register')({
  presets: [
    ['@babel/preset-env', {
      targets: { node: 'current' },
      modules: 'commonjs',
      shippedProposals: true,
      useBuiltIns: 'usage',
      corejs: 3,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  ignore: ['node_modules'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  cache: true,
});

// Now require the actual test file
require('./js/shapes-and-math/__tests__/boxes.test.js');
