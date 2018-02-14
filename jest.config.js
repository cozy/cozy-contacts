module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "styl"],
  setupFiles: ["<rootDir>/jestHelpers/setup.js"],
  moduleNameMapper: {
    "\\.(png|gif|jpe?g)$": "<rootDir>/jestHelpers/mocks/fileMock.js",
    "\\.svg$": "<rootDir>/jestHelpers/mocks/iconMock.js",
    styles: "identity-obj-proxy"
  },
  transformIgnorePatterns: ["node_modules/(?!cozy-ui)"]
};
