import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import flow from 'lodash/flow'

import { withClient } from 'cozy-client'
import SelectionBar from 'cozy-ui/transpiled/react/SelectionBar'
import Modal from 'cozy-ui/transpiled/react/Modal'

import withSelection from '../Selection/selectionContainer'
import withModalContainer from '../HOCs/withModal'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { getConnectedAccounts } from '../../helpers/contacts'
import { deleteContact } from '../../connections/allContacts'

class ContactsSelectionBar extends Component {
  render() {
    const {
      selection,
      clearSelection,
      showModal,
      t,
      hideModal,
      client
    } = this.props
    return selection.length > 0 ? (
      <SelectionBar
        selected={selection}
        hideSelectionBar={clearSelection}
        actions={{
          trash: {
            action: () => {
              const hasConnectedAccounts = contact =>
                getConnectedAccounts(contact).length > 0

              const allContactsConnected = selection.every(hasConnectedAccounts)
              const someContactsConnected = selection.some(hasConnectedAccounts)

              let description = 'delete-confirmation.description-simple'

              if (allContactsConnected)
                description = 'delete-confirmation.description-google'
              else if (someContactsConnected)
                description = 'delete-confirmation.description-mixed'

              showModal(
                <Modal
                  into="body"
                  title={t('delete-confirmation.title', {
                    smart_count: selection.length
                  })}
                  description={t(description, {
                    smart_count: selection.length
                  })}
                  primaryText={t('delete')}
                  primaryType="danger"
                  primaryAction={async () => {
                    await Promise.all(
                      selection.map(contact => deleteContact(client, contact))
                    )
                    clearSelection()
                    hideModal()
                  }}
                  secondaryText={t('cancel')}
                  secondaryAction={() => hideModal()}
                  dismissAction={hideModal}
                />
              )
            }
          }
        }}
      />
    ) : null
  }
}
ContactsSelectionBar.propTypes = {
  selection: PropTypes.array.isRequired,
  clearSelection: PropTypes.func.isRequired
}

export default flow(
  withClient,
  translate(),
  withModalContainer,
  withSelection
)(ContactsSelectionBar)
