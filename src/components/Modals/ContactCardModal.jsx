import React from 'react'
import { PropTypes } from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalHeader, ModalContent } from 'cozy-ui/react/Modal'
import { Icon, Menu, MenuItem, Button } from 'cozy-ui/react'

import { withContactsMutations } from '../../connections/allContacts'
import ContactCard from '../ContactCard/ContactCard'
import contactPropTypes from '../ContactPropTypes'
import SpinnerContact from '../Components/Spinner'

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
      ...state,
      shouldDisplayConfirmDeleteModal: !state.shouldDisplayConfirmDeleteModal
    }))
  }

  deleteContact = async () => {
    const { contact, deleteContact, onDeleteContact, onClose } = this.props
    onClose && onClose()
    await deleteContact(contact)
    onDeleteContact && onDeleteContact(contact)
  }

  render() {
    const { onClose, contact, t, groups, isloading } = this.props
    const { shouldDisplayConfirmDeleteModal } = this.state

    return (
      <Modal into="body" dismissAction={onClose} size="xlarge">
        {isloading && <SpinnerContact size="xxlarge" />}
        {!isloading && (
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
            renderBody={children => <ModalContent>{children}</ModalContent>}
          />
        )}
        {shouldDisplayConfirmDeleteModal && (
          <Modal
            into="body"
            title={t('delete-confirmation.title')}
            description={t('delete-confirmation.description')}
            primaryText={t('delete')}
            primaryType="danger"
            primaryAction={this.deleteContact}
            secondaryText={t('cancel')}
            secondaryAction={this.toggleConfirmDeleteModal}
            dismissAction={this.toggleConfirmDeleteModal}
          />
        )}
      </Modal>
    )
  }
}

ContactCardModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    email: PropTypes.arrayOf(contactPropTypes.email),
    address: PropTypes.arrayOf(contactPropTypes.address),
    cozy: PropTypes.arrayOf(contactPropTypes.cozy),
    birthday: contactPropTypes.birthday,
    note: contactPropTypes.note
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func,
  groups: PropTypes.array.isRequired,
  isloading: PropTypes.bool
}

export default translate()(withContactsMutations(ContactCardModal))
