import { generateWebLink } from 'cozy-client'
import { makeAction } from 'cozy-ui/transpiled/react/ActionsMenu/Actions/makeAction'
import PenIcon from 'cozy-ui/transpiled/react/Icons/Pen'

import { getAppI18n } from '@/locales/index'

export const edit = () => {
  const { t } = getAppI18n()

  const name = 'edit'
  const icon = PenIcon
  const label = t('edit')
  const action = (docs, { client }) => {
    const contactId = docs[0]._id

    const webLink = generateWebLink({
      slug: 'contacts',
      cozyUrl: client.getStackClient().uri,
      subDomainType: client.getInstanceOptions().subdomain,
      pathname: '/',
      hash: `/${contactId}/edit?backToRoot=true`
    })

    window.open(webLink, '_self')
  }

  return makeAction({ name, label, icon, action })
}
