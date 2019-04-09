import React from 'react'
import { PropTypes } from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalContent
} from 'cozy-ui/transpiled/react/Modal'
import { Button } from 'cozy-ui/transpiled/react'
import { DOCTYPE_CONTACTS } from '../../helpers/doctypes'
import { getConnectedAccounts } from '../../helpers/contacts'

import withContactsMutations from '../../connections/allContacts'
import ContactCard from '../ContactCard/ContactCard'
import SpinnerContact from '../Components/Spinner'
import ContactCardMenu from './ContactCardMenu'
import ContactFormModal from './ContactFormModal'
import ContactGroups from '../ContactCard/ContactGroups'
import { Query } from 'cozy-client'
import { flow } from 'lodash'
class ContactCardModal extends React.Component {
  state = {
    editMode: false,
    shouldDisplayConfirmDeleteModal: false
  }

  toggleConfirmDeleteModal = () => {
    this.setState(state => ({
      shouldDisplayConfirmDeleteModal: !state.shouldDisplayConfirmDeleteModal
    }))
  }

  deleteContact = async (contactParam = null) => {
    const { contact, deleteContact, onDeleteContact, onClose } = this.props
    onClose && onClose()
    await deleteContact(contactParam ? contactParam : contact)
    onDeleteContact && onDeleteContact(contactParam ? contactParam : contact)
  }

  toggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode
    }))
  }

  render() {
    const { onClose, t, id } = this.props
    const { editMode, shouldDisplayConfirmDeleteModal } = this.state

    return (
      <Modal into="body" dismissAction={onClose} size="xlarge" mobileFullscreen>
        <Query query={client => client.get(DOCTYPE_CONTACTS, id)}>
          {({ data: contact, fetchStatus: fetchStatusContact }) => {
            return (
              <Query
                query={client =>
                  client
                    .find('io.cozy.contacts.groups')
                    .where({
                      trashed: { $exists: false }
                    })
                    .sortBy([{ name: 'asc' }])
                    .indexFields(['name'])
                }
              >
                {({ data: allGroups, fetchStatus: allGroupsContactStatus }) => {
                  if (
                    fetchStatusContact !== 'loaded' ||
                    allGroupsContactStatus !== 'loaded'
                  ) {
                    return <SpinnerContact size="xxlarge" />
                  }
                  if (
                    !editMode &&
                    fetchStatusContact === 'loaded' &&
                    allGroupsContactStatus === 'loaded'
                  ) {
                    return (
                      <ContactCard
                        contact={contact}
                        allGroups={allGroups}
                        renderHeader={children => (
                          <ModalHeader className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s">
                            {children}
                            <div>
                              <Button
                                type="button"
                                theme="secondary"
                                icon="pen"
                                label={t('edit')}
                                onClick={this.toggleEditMode}
                              />
                            </div>
                            <div className="u-flex u-flex-row u-ml-auto u-ml-0-s">
                              <ContactGroups
                                contact={contact}
                                allGroups={allGroups}
                              />
                              <ContactCardMenu
                                deleteAction={{
                                  label: t('delete'),
                                  action: this.toggleConfirmDeleteModal
                                }}
                              />
                            </div>
                          </ModalHeader>
                        )}
                        renderBody={children => (
                          <ModalContent>{children}</ModalContent>
                        )}
                      />
                    )
                  }

                  if (editMode && fetchStatusContact === 'loaded') {
                    return (
                      <ContactFormModal
                        contact={contact}
                        onClose={this.toggleEditMode}
                        title={t('edit-contact')}
                        afterMutation={this.toggleEditMode}
                      />
                    )
                  }

                  if (shouldDisplayConfirmDeleteModal) {
                    return (
                      <Modal
                        into="body"
                        title={t('delete-confirmation.title', {
                          smart_count: 1
                        })}
                        description={t(
                          getConnectedAccounts(contact).length > 0
                            ? 'delete-confirmation.description-google'
                            : 'delete-confirmation.description-simple',
                          {
                            smart_count: 1
                          }
                        )}
                        primaryText={t('delete')}
                        primaryType="danger"
                        primaryAction={() => this.deleteContact(contact)}
                        secondaryText={t('cancel')}
                        secondaryAction={this.toggleConfirmDeleteModal}
                        dismissAction={this.toggleConfirmDeleteModal}
                      />
                    )
                  }
                }}
              </Query>
            )
          }}
        </Query>
      </Modal>
    )
  }
}

ContactCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func,
  isloading: PropTypes.bool
}

export default flow(
  withContactsMutations,
  translate()
)(ContactCardModal)
