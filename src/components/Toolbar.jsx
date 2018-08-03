import React from 'react'
import { PropTypes } from 'prop-types'
import OpenContactFormButton from 'components/Buttons/OpenContactFormButton'
import ContactsIntentButton from 'components/Buttons/ContactsIntentButton'

const Toolbar = ({ openContactForm }, { t }) => {
  const fakeintent = new URL(window.location).searchParams.get('fakeintent')
  return (
    <div className="actions">
      {fakeintent !== null && (
        <ContactsIntentButton
          label={'Select a Contact (intent)'}
          action="PICK"
        />
      )}
      {fakeintent !== null && (
        <ContactsIntentButton
          label={'Create a Contact (intent)'}
          action="CREATE"
          data={{ me: true }}
        />
      )}
      <OpenContactFormButton
        onClick={openContactForm}
        label={t('create_contact')}
      />
    </div>
  )
}

Toolbar.propTypes = {
  openContactForm: PropTypes.func.isRequired
}

export default Toolbar
