// Simple Babel config for Jest tests
module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { 
        node: 'current' 
      },
      modules: 'commonjs',
    }],
  ],
};
