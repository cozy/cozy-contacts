import React from 'react'
import { PropTypes } from 'prop-types'
import ContactsIntentButton from './Buttons/ContactsIntentButton'
import { Button } from 'cozy-ui/react'
import IconTeam from '../assets/icons/team.svg'
import { translate } from 'cozy-ui/react/I18n'
const Toolbar = ({ displayContactForm, displayVcardImport, t }) => {
  const searchParams = new URL(window.location).searchParams
  const fakeintentEnabled = searchParams.get('fakeintent') !== null
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
        onClick={displayContactForm}
        icon="plus"
        label={t('create_contact')}
      />
      <Button
        onClick={displayVcardImport}
        label={t('empty.importation')}
        theme="secondary"
        icon={IconTeam}
      />
    </div>
  )
}

Toolbar.propTypes = {
  displayContactForm: PropTypes.func.isRequired,
  displayVcardImport: PropTypes.func.isRequired
}

export default translate()(Toolbar)
