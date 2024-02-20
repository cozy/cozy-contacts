const VersionPlugin = require('cozy-scripts/plugins/VersionPlugin')

const config = [require('cozy-scripts/config/webpack.bundle.default.js')]

const extraPluginsConfig = {
  plugins: [
    new VersionPlugin({
      packages: [
        'cozy-bar',
        'cozy-client',
        'cozy-device-helper',
        'cozy-doctypes',
        'cozy-flags',
        'cozy-harvest-lib',
        'cozy-intent',
        'cozy-interapp',
        'cozy-keys-lib',
        'cozy-minilog',
        'cozy-realtime',
        'cozy-scripts',
        'cozy-sharing',
        'cozy-ui'
      ]
    })
  ]
}
config.push(extraPluginsConfig)

module.exports = config
