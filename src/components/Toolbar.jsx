import React from 'react'
import { PropTypes } from 'prop-types'
import ContactsIntentButton from 'components/Buttons/ContactsIntentButton'
import { Button } from 'cozy-ui/react'
import IconTeam from '../assets/icons/team.svg'

const Toolbar = ({ openContactForm, displayVcardImport }, { t }) => {
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
      <Button
        onClick={openContactForm}
        icon="plus"
        label={t('create_contact')}
      />
      {vcardEnabled && (
        <Button
          className="contacts-empty-button"
          onClick={displayVcardImport}
          label={t('empty.importation')}
          theme="secondary"
          icon={IconTeam}
        />
      )}
    </div>
  )
}

Toolbar.propTypes = {
  openContactForm: PropTypes.func.isRequired,
  displayVcardImport: PropTypes.func.isRequired
}

export default Toolbar
