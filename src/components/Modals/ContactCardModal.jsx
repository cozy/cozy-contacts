import React from 'react'
import { PropTypes } from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalContent
} from 'cozy-ui/transpiled/react/Modal'
import { Button } from 'cozy-ui/transpiled/react'
import { DOCTYPE_CONTACTS } from '../../helpers/doctypes'

import withContactsMutations from '../../connections/allContacts'
import ContactCard from '../ContactCard/ContactCard'
import SpinnerContact from '../Components/Spinner'
import ContactCardMenu from './ContactCardMenu'
import ContactFormModal from './ContactFormModal'
import { Query } from 'cozy-client'

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
      <Query query={client => client.get(DOCTYPE_CONTACTS, id)}>
        {({ data: contact, fetchStatus }) => {
          return (
            <Modal
              into="body"
              dismissAction={onClose}
              size="xlarge"
              mobileFullscreen
            >
              {fetchStatus !== 'loaded' && <SpinnerContact size="xxlarge" />}
              {!editMode &&
                fetchStatus === 'loaded' && (
                  <ContactCard
                    title={t('contact_info')}
                    contact={contact}
                    renderHeader={children => (
                      <ModalHeader className="contact-card-modal__header">
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
                        <ContactCardMenu
                          deleteAction={{
                            label: t('delete'),
                            action: this.toggleConfirmDeleteModal
                          }}
                        />
                      </ModalHeader>
                    )}
                    renderBody={children => (
                      <ModalContent>{children}</ModalContent>
                    )}
                  />
                )}

              {editMode &&
                fetchStatus === 'loaded' && (
                  <ContactFormModal
                    contact={contact}
                    onClose={this.toggleEditMode}
                    title={t('edit-contact')}
                    afterMutation={this.toggleEditMode}
                  />
                )}

              {shouldDisplayConfirmDeleteModal && (
                <Modal
                  into="body"
                  title={t('delete-confirmation.title', { smart_count: 1 })}
                  description={t('delete-confirmation.description', {
                    smart_count: 1
                  })}
                  primaryText={t('delete')}
                  primaryType="danger"
                  primaryAction={() => this.deleteContact(contact)}
                  secondaryText={t('cancel')}
                  secondaryAction={this.toggleConfirmDeleteModal}
                  dismissAction={this.toggleConfirmDeleteModal}
                />
              )}
            </Modal>
          )
        }}
      </Query>
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

export default translate()(withContactsMutations(ContactCardModal))
