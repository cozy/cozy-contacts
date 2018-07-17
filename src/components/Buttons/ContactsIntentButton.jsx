import React from 'react'
import PropTypes from 'prop-types'
import { Button, IntentOpener } from 'cozy-ui/react'

const ContactsIntentButton = ({ label, action, data }) => (
  <div>
    <IntentOpener
      onComplete={res => {
        alert(`intent has completed: ${JSON.stringify(res)}`)
      }}
      onDismiss={() => {}}
      action={action}
      doctype="io.cozy.contacts"
      options={data}
      size="xlarge"
    >
      <Button label={label} />
    </IntentOpener>
  </div>
)
ContactsIntentButton.propTypes = {
  label: PropTypes.string,
  action: PropTypes.string,
  data: PropTypes.object
}
ContactsIntentButton.defaultProps = {
  label: 'Select a Contact',
  action: 'PICK',
  data: {}
}

export default ContactsIntentButton
