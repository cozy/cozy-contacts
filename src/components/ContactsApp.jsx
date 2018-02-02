import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";

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
      <div>
        <ContactsHeader />
        <ConnectedContactsList onClickContact={this.showContact} />
        {displayedContact && (
          <ContactCard contact={displayedContact} onClose={this.hideContact} />
        )}
      </div>
    );
  }
}

export default withContacts(ContactsApp);
