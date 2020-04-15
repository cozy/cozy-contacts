import React from 'react'
import PropTypes from 'prop-types'
import IntentOpener from 'cozy-ui/transpiled/react/IntentOpener'
import Button from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import IconGoogle from '../../assets/icons/connect-google.svg'

const style = { pointerEvents: 'all' }
const ImportGoogleButton = props => (
  <IntentOpener
    action="INSTALL"
    doctype="io.cozy.apps"
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
