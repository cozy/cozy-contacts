import { generateWebLink } from 'cozy-client'
import { makeAction } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/makeAction'
import People from 'cozy-ui/transpiled/react/Icons/People'

import { getAppI18n } from '@/locales/index'

export const view = ({ client }) => {
  const { t } = getAppI18n()

  const name = 'view'
  const icon = People
  const label = t('view-contact')
  const action = docs => {
    const contactId = docs[0]._id

    const webLink = generateWebLink({
      slug: 'contacts',
      cozyUrl: client.getStackClient().uri,
      subDomainType: client.getInstanceOptions().subdomain,
      pathname: '/',
      hash: `/${contactId}`
    })

    window.open(webLink, '_self')
  }

  return makeAction({ name, label, icon, action })
}
