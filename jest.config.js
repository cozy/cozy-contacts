module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "styl"],
  setupFiles: ["<rootDir>/test/setup.js"],
  moduleNameMapper: {
    "\\.(png|gif|jpe?g|svg)$": "<rootDir>/test/__mocks__/fileMock.js",
    styles: "identity-obj-proxy"
  },
  transformIgnorePatterns: ["node_modules/(?!cozy-ui)"]
};
