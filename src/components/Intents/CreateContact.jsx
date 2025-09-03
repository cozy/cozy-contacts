import flow from 'lodash/flow'
import PropTypes from 'prop-types'
import React from 'react'

import { withClient } from 'cozy-client'
import ContactForm from 'cozy-ui/transpiled/react/Contacts/AddModal/ContactForm'
import IntentHeader from 'cozy-ui/transpiled/react/IntentHeader'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import IntentMain from './IntentMain'

import { DOCTYPE_CONTACTS } from '@/helpers/doctypes'

const CreateContact = ({ client, data, onTerminate, onError, onCancel }) => {
  const createContact = async contact => {
    try {
      const me = !!data.me
      if (me) contact.metadata.me = true
      const resp = await client.create(DOCTYPE_CONTACTS, contact)
      onTerminate(resp.data)
    } catch (e) {
      onError('Could not create contact')
    }
  }

  const cancel = () => {
    onCancel()
  }

  return (
    <div className="intent-layout">
      <IntentHeader appEditor="Cozy" appName="Contacts" appIcon="/icon.svg" />
      <IntentMain>
        <div className="intent-create-form-wrapper">
          <ContactForm onSubmit={createContact} onCancel={cancel} />
        </div>
      </IntentMain>
    </div>
  )
}

CreateContact.propTypes = {
  data: PropTypes.object,
  onTerminate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

CreateContact.defaultProps = {
  data: {}
}

export default flow(translate(), withClient)(CreateContact)
