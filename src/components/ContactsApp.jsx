import React from "react";
import PropTypes from "prop-types";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";

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
    const { contacts } = this.props;

    return (
      <div>
        <ContactsHeader />
        <ContactsList contacts={contacts} onClickContact={this.showContact} />
        {displayedContact && (
          <ContactCard contact={displayedContact} onClose={this.hideContact} />
        )}
      </div>
    );
  }
}

ContactsApp.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default withContacts(ContactsApp);
