import React from "react";
import { PropTypes } from "prop-types";
import Modal, { ModalTitle, ModalDescription } from "cozy-ui/react/Modal";
import ContactForm from "../ContactCard/ContactForm";

const ContactFormModal = ({ hideModal, title, createContact }) => (
  <Modal overflowHidden={true} dismissAction={hideModal}>
    <ModalTitle>{title}</ModalTitle>
    <ModalDescription className="u-mt-half">
      <ContactForm onSubmit={createContact} onCancel={hideModal} />
    </ModalDescription>
  </Modal>
);
ContactFormModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createContact: PropTypes.func.isRequired
};

export default ContactFormModal;
