import React from 'react'
import PropTypes from 'prop-types'
import { IntentOpener } from 'cozy-ui/react'
import SecondaryButton from './SecondaryButton'
import IconGoogle from '../../assets/icons/connect-google.svg'

const ImportGoogleButton = (props, { t }) => (
  <IntentOpener
    action="CREATE"
    doctype="io.cozy.accounts"
    options={{ slug: 'google' }}
    onComplete={props.onComplete}
  >
    <SecondaryButton className="contacts-empty-button" icon={IconGoogle}>
      {t('empty.google')}
    </SecondaryButton>
  </IntentOpener>
)
ImportGoogleButton.propTypes = {
  onComplete: PropTypes.func
}
ImportGoogleButton.defaultProps = {
  onComplete: () => {}
}

export default ImportGoogleButton
