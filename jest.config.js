const { analyzePackagesWhitelist } = require('./analyze.config.js');

module.exports = {
  verbose: true,
  transformIgnorePatterns: [
    `/node_modules(?!/@bufferapp/*)${analyzePackagesWhitelist}/`,
  ],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/jest-raf-shim.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/setupEnzyme.js',
  globals: {
    __PACKAGES__: '../packages',
  },
  testURL: 'https://publish.local.buffer.com',
};
