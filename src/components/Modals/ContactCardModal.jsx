import React from "react";
import { PropTypes } from "prop-types";
import { withContactsMutations } from "../../connections/allContacts";
import Modal, { ModalHeader, ModalContent } from "cozy-ui/react/Modal";
import ComingSoon from "../ComingSoon";
import { Button } from "cozy-ui/react";
import ContactCard from "../ContactCard/ContactCard";
import contactPropTypes from "../ContactPropTypes";
import IconEdit from "../../assets/icons/edit.svg";

const ContactCardMenu = () => (
  <div className="fix-modal-menu">
    <ComingSoon />
    <Button theme="secondary" extension="narrow" icon={IconEdit} disabled />
    <Button theme="secondary" extension="narrow" icon="delete" disabled />
  </div>
);
ContactCardMenu.propTypes = {};

class ContactCardModal extends React.Component {
  state = {
    shouldDisplayConfirmDeleteModal: false
  };

  toggleConfirmDeleteModal = () => {
    this.setState(state => ({
      ...state,
      shouldDisplayConfirmDeleteModal: !state.shouldDisplayConfirmDeleteModal
    }));
  };

  deleteContact = async () => {
    const { contact, deleteContact, onDeleteContact } = this.props;
    await deleteContact(contact);
    onDeleteContact(contact);
  };

  render() {
    const { onClose, contact } = this.props;
    const { shouldDisplayConfirmDeleteModal } = this.state;
    const { t } = this.context;

    return (
      <Modal into="body" dismissAction={onClose} size="xlarge">
        <ContactCard
          title={t("contact_info")}
          contact={contact}
          renderHeader={children => (
            <ModalHeader className="contact-card-modal__header">
              {children}
              <ContactCardMenu
                deleteAction={{
                  label: t("delete"),
                  action: this.toggleConfirmDeleteModal
                }}
              />
            </ModalHeader>
          )}
          renderBody={children => <ModalContent>{children}</ModalContent>}
        />
        {shouldDisplayConfirmDeleteModal && (
          <Modal
            into="body"
            title={t("delete-confirmation.title")}
            description={t("delete-confirmation.description")}
            primaryText={t("delete")}
            primaryType="danger"
            primaryAction={this.deleteContact}
            secondaryText={t("cancel")}
            secondaryAction={this.toggleConfirmDeleteModal}
            dismissAction={this.toggleConfirmDeleteModal}
          />
        )}
      </Modal>
    );
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
  onDeleteContact: PropTypes.func.isRequired
};

export default withContactsMutations(ContactCardModal);
