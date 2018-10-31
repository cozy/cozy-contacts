import React from 'react'
import { PropTypes } from 'prop-types'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Modal, {
  ModalHeader,
  ModalContent
} from 'cozy-ui/transpiled/react/Modal'
import { Icon, Menu, MenuItem, Button } from 'cozy-ui/transpiled/react'

import { withContactsMutations } from '../../connections/allContacts'
import ContactCard from '../ContactCard/ContactCard'
import SpinnerContact from '../Components/Spinner'
import { Query } from 'cozy-client'

const ContactCardMenu = ({ deleteAction }) => (
  <Menu
    position="right"
    className="contact-card-modal__menu"
    component={
      <Button
        theme="secondary"
        extension="narrow"
        icon="dots"
        className="fix-c-btn"
        iconOnly
        label={deleteAction.label}
      />
    }
  >
    <MenuItem
      className="menu__item--danger"
      icon={<Icon icon="delete" />}
      onSelect={deleteAction.action}
    >
      {deleteAction.label}
    </MenuItem>
  </Menu>
)
ContactCardMenu.propTypes = {
  deleteAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
}

class ContactCardModal extends React.Component {
  state = {
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

  render() {
    const { onClose, t, groups, id } = this.props
    const { shouldDisplayConfirmDeleteModal } = this.state
    return (
      <Query query={client => client.get('io.cozy.contacts', id)}>
        {({ data: contact, fetchStatus }) => {
          return (
            <Modal into="body" dismissAction={onClose} size="xlarge">
              {fetchStatus !== 'loaded' && <SpinnerContact size="xxlarge" />}
              {fetchStatus === 'loaded' && (
                <ContactCard
                  title={t('contact_info')}
                  contact={contact}
                  groups={groups}
                  renderHeader={children => (
                    <ModalHeader className="contact-card-modal__header">
                      {children}
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

              {shouldDisplayConfirmDeleteModal && (
                <Modal
                  into="body"
                  title={t('delete-confirmation.title')}
                  description={t('delete-confirmation.description')}
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
  groups: PropTypes.array.isRequired,
  isloading: PropTypes.bool
}

export default translate()(withContactsMutations(ContactCardModal))
