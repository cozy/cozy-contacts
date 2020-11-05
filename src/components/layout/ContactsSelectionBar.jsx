import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flow from 'lodash/flow'

import { withClient } from 'cozy-client'
import SelectionBar from 'cozy-ui/transpiled/react/SelectionBar'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Button'

import withSelection from '../Selection/selectionContainer'
import withModalContainer from '../HOCs/withModal'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { getConnectedAccounts } from '../../helpers/contacts'
import { deleteContact } from '../../connections/allContacts'

class ContactsSelectionBar extends Component {
  state = {
    isBusy: false
  }

  componentDidUpdate() {
    console.info('componentDidUpdate ContactsSelectionBar')
  }

  render() {
    const {
      selection,
      clearSelection,
      showModal,
      t,
      hideModal,
      client
    } = this.props
    console.info('render ContactsSelectionBar', this.state)

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

              console.info('SelectionBar actions this.state', this.state)

              showModal(
                <ConfirmDialog
                  open={true}
                  onClose={hideModal}
                  title={t('delete-confirmation.title', {
                    smart_count: selection.length
                  })}
                  content={t(description, {
                    smart_count: selection.length
                  })}
                  actions={
                    <>
                      <Button
                        theme="secondary"
                        label={t('cancel')}
                        onClick={hideModal}
                      />
                      <Button
                        theme="danger"
                        label={`${this.state.isBusy}`}
                        busy={this.state.isBusy}
                        onClick={async () => {
                          console.info('before setState', this.state)
                          this.setState({ isBusy: true }, () => {
                            console.info('after setState callback', this.state)
                          })
                          console.info('after setState', this.state)
                          // await Promise.all(
                          //   selection.map(contact =>
                          //     deleteContact(client, contact)
                          //   )
                          // )
                          // this.setState({ isBusy: false })
                          // clearSelection()
                          // hideModal()
                        }}
                      />
                    </>
                  }
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
