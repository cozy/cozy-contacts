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
  <div className="contact-accounts">
    <h3 className="contact-fields-title">
      {t('associated_accounts', {
        smart_count: accounts.length
      })}
    </h3>
    <ol className="contact-field-list">
      {accounts.map(account => {
        const { icon, label } = ACCOUNTS_MAPPING[account.type]
        return (
          <li key={account.id}>
            <div className="contact-field">
              <div className="contact-field-icon">
                <Icon icon={icon} />
              </div>
              <div>
                <div className="contact-field-value">
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
