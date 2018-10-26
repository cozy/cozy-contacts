import React from 'react'
import PropTypes from 'prop-types'
import { IntentOpener, Button } from 'cozy-ui/react'
import IconGoogle from '../../assets/icons/connect-google.svg'
import { translate } from 'cozy-ui/react/I18n'

const style = { pointerEvents: 'all' }
const ImportGoogleButton = props => (
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
      label={props.t('empty.google')}
      style={style}
    />
  </IntentOpener>
)
ImportGoogleButton.propTypes = {
  onComplete: PropTypes.func
}
ImportGoogleButton.defaultProps = {
  onComplete: () => {}
}

export default translate()(ImportGoogleButton)
