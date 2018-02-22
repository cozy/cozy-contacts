import React from "react";
import { PropTypes } from "prop-types";
import { withMutation, destroy } from "cozy-client";
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

const ContactCardModal = (
  { onClose, contact, deleteContact, onDeleteContact },
  { t }
) => (
  <Modal into="body" dismissAction={onClose} size="xlarge">
    <ModalContent>
      <ContactCard
        title={t("contact_info")}
        contact={contact}
        renderActions={() => (
          <ContactCardMenu
            deleteAction={{
              label: t("delete"),
              action: () => deleteContact(contact).then(() => onDeleteContact())
            }}
          />
        )}
      />
    </ModalContent>
  </Modal>
);
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

export default withMutation(destroy, {
  name: "deleteContact",
  updateQueries: {
    allContacts: (previousData, result) => {
      const idx = previousData.findIndex(c => c.id === result.data[0].id);
      return [...previousData.slice(0, idx), ...previousData.slice(idx + 1)];
    }
  }
})(ContactCardModal);
