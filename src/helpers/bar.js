/* global cozy */

import manifest from '../../manifest.webapp'

const getDataOrDefault = (data, defaultData) =>
  /^\{\{\..*\}\}$/.test(data) ? defaultData : data

/**
 * default data will allow to display correctly the cozy-bar
 * in the standalone (without cozy-stack connexion)
 */
export const getValues = ({
  cozyAppName,
  cozyAppNamePrefix,
  cozyIconPath,
  cozyLocale
}) => {
  const defaultValues = {
    appIconDefault: require('../targets/vendor/assets/icon.svg'),
    appNamePrefixDefault: manifest.name_prefix,
    appNameDefault: manifest.name,
    appLocaleDefault: 'en'
  }
  return {
    appName: getDataOrDefault(cozyAppName, defaultValues.appNameDefault),
    appNamePrefix: getDataOrDefault(
      cozyAppNamePrefix,
      defaultValues.appNamePrefixDefault
    ),
    iconPath: getDataOrDefault(cozyIconPath, defaultValues.appIconDefault),
    lang: getDataOrDefault(cozyLocale, defaultValues.appLocaleDefault)
  }
}

/**
 * Cozy bar initialization
 * @param {object} client - cozy client
 */
export const initBar = ({ client, root, lang, appName }) => {
  const { appNamePrefix, iconPath } = getValues(root.dataset)

  cozy.bar.init({
    appName,
    appNamePrefix,
    cozyClient: client,
    iconPath,
    lang,
    replaceTitleOnMobile: false
  })
}
