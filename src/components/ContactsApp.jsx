import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";
import Modal, { ModalContent } from "cozy-ui/react/Modal";
import { Button } from "cozy-ui/react/Button";
import { translate } from "cozy-ui/react/I18n";
import { PropTypes } from "prop-types";

const TranslatedContactCard = translate()(({ t, ...props }) => (
  <ContactCard title={t("contact_info")} {...props} />
));

const ContactActions = ({ contact, deleteContact }) => (
  <div>
    <Button theme="danger" onClick={() => deleteContact(contact)}>
      delete
    </Button>
  </div>
);

class ContactsApp extends React.Component {
  static propTypes = {
    contacts: PropTypes.array,
    deleteContact: PropTypes.func
  };

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
          <Modal into="body" dismissAction={this.hideContactCard}>
            <ModalContent>
              <TranslatedContactCard
                contact={displayedContact}
                renderActions={() => (
                  <ContactActions
                    contact={displayedContact}
                    deleteContact={this.onDeleteContact}
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

export default ContactsApp;
