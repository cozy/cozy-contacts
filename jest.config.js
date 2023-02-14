module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  transformIgnorePatterns: ['node_modules/(?!cozy-ui)'],
  setupFiles: ['<rootDir>/jestHelpers/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/jestHelpers/setupAfterEnv.js'],
  moduleNameMapper: {
    '.(png|gif|jpe?g)$': '<rootDir>/jestHelpers/mocks/fileMock.js',
    '.svg$': '<rootDir>/jestHelpers/mocks/iconMock.js',
    '.styl$': 'identity-obj-proxy',
    '\\.worker.entry.js': '<rootDir>/jestHelpers/mocks/workerMock.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.webapp$': '<rootDir>/json-transformer.js'
  },
  testEnvironment: 'jest-environment-jsdom-sixteen',
  resolver: '<rootDir>/resolver.js',
  testURL: 'http://localhost',
  globals: {
    __DEVELOPMENT__: false
  }
}
