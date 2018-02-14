import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";
import Modal, { ModalContent } from "cozy-ui/react/Modal";
import { Button } from "cozy-ui/react/Button";
import { PropTypes } from "prop-types";
import { Icon, Menu, MenuItem } from "cozy-ui/react";

const TranslatedContactCard = ({ ...props }, { t }) => (
  <ContactCard title={t("contact_info")} {...props} />
);

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

class ContactsApp extends React.Component {
  state = {
    displayedContact: null
  };

  displayContactCard = contact => {
    this.setState({
      displayedContact: contact
    });
  };

  hideContactCard = () => {
    this.setState({
      displayedContact: null
    });
  };

  onDeleteContact = contact => {
    this.props.deleteContact(contact);
    this.hideContactCard();
  };

  render() {
    const { displayedContact } = this.state;

    return (
      <main className="app-content">
        <ContactsHeader />
        <div role="contentinfo">
          <ContactsList
            onClickContact={this.displayContactCard}
            contacts={this.props.contacts}
          />
        </div>
        {displayedContact && (
          <Modal
            into="body"
            dismissAction={this.hideContactCard}
            size="xxlarge"
          >
            <ModalContent>
              <TranslatedContactCard
                contact={displayedContact}
                renderActions={() => (
                  <ContactCardMenu
                    deleteAction={{
                      label: this.context.t("delete"),
                      action: () => this.onDeleteContact(displayedContact)
                    }}
                  />
                )}
              />
            </ModalContent>
          </Modal>
        )}
      </main>
    );
  }
}
ContactsApp.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func
};

export default ContactsApp;
