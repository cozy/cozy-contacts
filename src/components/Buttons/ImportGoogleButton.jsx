import React from 'react'
import PropTypes from 'prop-types'
import { IntentOpener, Button } from 'cozy-ui/react'
import IconGoogle from '../../assets/icons/connect-google.svg'

const ImportGoogleButton = (props, { t }) => (
  <IntentOpener
    action="CREATE"
    doctype="io.cozy.accounts"
    options={{ slug: 'google' }}
    onComplete={props.onComplete}
  >
    <Button
      theme="secondary"
      className="contacts-empty-button"
      icon={IconGoogle}
      label={t('empty.google')}
    />
  </IntentOpener>
)
ImportGoogleButton.propTypes = {
  onComplete: PropTypes.func
}
ImportGoogleButton.defaultProps = {
  onComplete: () => {}
}

export default ImportGoogleButton
