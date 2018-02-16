import React from "react";
import { PropTypes } from "prop-types";
import Modal, { ModalTitle, ModalDescription } from "cozy-ui/react/Modal";
import ContactForm from "../ContactCard/ContactForm";

const ContactFormModal = ({ hideModal }) => (
  <Modal overflowHidden={true} dismissAction={hideModal}>
    <ModalTitle>Create a Contact</ModalTitle>
    <ModalDescription className="u-mt-half">
      <ContactForm />
    </ModalDescription>
  </Modal>
);
ContactFormModal.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default ContactFormModal;
