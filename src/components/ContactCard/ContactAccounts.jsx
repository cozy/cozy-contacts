import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import Fieldset from '../Common/Fieldset'
import FieldsetTitle from '../Common/FieldsetTitle'

const ACCOUNTS_MAPPING = {
  'konnector-google': {
    label: 'Google',
    icon: 'google'
  }
}

const ContactAccounts = ({ accounts, t }) => (
  <>
    <FieldsetTitle
      title={t('associated_accounts', { smart_count: accounts.length })}
    />
    <Fieldset>
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
                  <Typography variant="body1">{label}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {account.name}
                  </Typography>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </Fieldset>
  </>
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
