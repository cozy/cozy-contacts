import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Text, Caption } from 'cozy-ui/transpiled/react/Text'
import Icon from 'cozy-ui/transpiled/react/Icon'

import IconGoogle from '../../assets/icons/connect-google.svg'

const ACCOUNTS_MAPPING = {
  'konnector-google': {
    label: 'Google',
    icon: IconGoogle
  }
}

const ContactAccounts = ({ accounts, t }) => (
  <div>
    <h3 className="u-title-h2 u-mt-1-half u-mb-1">
      {t('associated_accounts', {
        smart_count: accounts.length
      })}
    </h3>
    <ol className="u-nolist u-m-0 u-p-0 u-pl-1-half u-pl-0-s">
      {accounts.map(account => {
        const { icon, label } = ACCOUNTS_MAPPING[account.type]
        return (
          <li key={account.id}>
            <div className="u-flex u-mt-1 u-mb-half">
              <div className="u-mr-1">
                <Icon icon={icon} />
              </div>
              <div>
                <div className="u-mb-half u-breakword">
                  <Text>{label}</Text>
                  <Caption>{account.name}</Caption>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  </div>
)

ContactAccounts.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  )
}

export default translate()(ContactAccounts)
