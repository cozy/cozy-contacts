import React from "react";
import { PropTypes } from "prop-types";
import Modal, { ModalContent } from "cozy-ui/react/Modal";
import { Icon, Menu, MenuItem, Button } from "cozy-ui/react";
import ContactCard from "../ContactCard/ContactCard";
import contactPropTypes from "../ContactPropTypes";

const ContactCardMenu = ({ deleteAction }) => (
  <Menu
    position="right"
    component={
      <Button theme="secondary" extension="narrow" class="fix-c-btn">
        <Icon icon="dots" />
      </Button>
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
);
ContactCardMenu.propTypes = {
  deleteAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  }).isRequired
};

const ContactCardModal = ({ hideModal, contact, onDeleteContact }, { t }) => (
  <Modal into="body" dismissAction={hideModal} size="xlarge">
    <ModalContent>
      <ContactCard
        title={t("contact_info")}
        contact={contact}
        renderActions={() => (
          <ContactCardMenu
            deleteAction={{
              label: t("delete"),
              action: () => onDeleteContact(contact)
            }}
          />
        )}
      />
    </ModalContent>
  </Modal>
);
ContactCardModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    name: contactPropTypes.name,
    phone: PropTypes.arrayOf(contactPropTypes.phone),
    email: PropTypes.arrayOf(contactPropTypes.email),
    address: PropTypes.arrayOf(contactPropTypes.address),
    cozy: PropTypes.arrayOf(contactPropTypes.cozy),
    birthday: contactPropTypes.birthday,
    note: contactPropTypes.note
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired
};

export default ContactCardModal;
