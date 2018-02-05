import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";
import Modal, { ModalContent } from "cozy-ui/react/Modal";

const ConnectedContactsList = withContacts(ContactsList);

class ContactsApp extends React.Component {
  state = {
    displayedContact: null
  };

  showContact = contact => {
    this.setState({
      displayedContact: contact
    });
  };

  hideContact = () => {
    this.setState({
      displayedContact: null
    });
  };

  render() {
    const { displayedContact } = this.state;

    return (
      <main className="app-content">
        <ContactsHeader />
        <div role="contentinfo">
          <ConnectedContactsList onClickContact={this.showContact} />
        </div>
        {displayedContact && (
          <Modal into="body" dismissAction={this.hideContact}>
            <ModalContent>
              <ContactCard contact={displayedContact} />
            </ModalContent>
          </Modal>
        )}
      </main>
    );
  }
}

export default withContacts(ContactsApp);
