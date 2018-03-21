module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "styl"],
  transformIgnorePatterns: ["node_modules/(?!cozy-ui)"],
  setupFiles: ["<rootDir>/jestHelpers/setup.js"],
  moduleNameMapper: {
    ".(png|gif|jpe?g)$": "<rootDir>/jestHelpers/mocks/fileMock.js",
    ".svg$": "<rootDir>/jestHelpers/mocks/iconMock.js",
    ".styl$": "identity-obj-proxy"
  }
};
