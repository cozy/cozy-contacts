import React from 'react'
import { PropTypes } from 'prop-types'
import OpenContactFormButton from 'components/Buttons/OpenContactFormButton'
import ContactsIntentButton from 'components/Buttons/ContactsIntentButton'
import ImportVcardButton from 'components/Buttons/ImportVcardButton'

const Toolbar = ({ openContactForm, displayVcardImport }) => {
  const searchParams = new URL(window.location).searchParams
  const fakeintentEnabled = searchParams.get('fakeintent') !== null
  const vcardEnabled = searchParams.get('enablevcardimport') !== null
  return (
    <div className="actions">
      {fakeintentEnabled && (
        <ContactsIntentButton
          label={'Select a Contact (intent)'}
          action="PICK"
        />
      )}
      {fakeintentEnabled && (
        <ContactsIntentButton
          label={'Create a Contact (intent)'}
          action="CREATE"
          data={{ me: true }}
        />
      )}
      <OpenContactFormButton onClick={openContactForm} />
      {vcardEnabled && <ImportVcardButton onClick={displayVcardImport} />}
    </div>
  )
}

Toolbar.propTypes = {
  openContactForm: PropTypes.func.isRequired,
  displayVcardImport: PropTypes.func.isRequired
}

export default Toolbar
