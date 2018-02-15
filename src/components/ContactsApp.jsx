import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import { PropTypes } from "prop-types";
import ContactsIntentButton from "./Buttons/ContactsIntentButton";
import ContactCardModal from "./Modals/ContactCardModal";

const ContactsHeaderWithActions = () => (
  <ContactsHeader
    renderActions={() => {
      const fakeintent = new URL(window.location).searchParams.get(
        "fakeintent"
      );
      return (
        <div className="actions">
          {fakeintent !== null && (
            <ContactsIntentButton>{"Select a Contact"}</ContactsIntentButton>
          )}
        </div>
      );
    }}
  />
);

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
        <ContactsHeaderWithActions />
        <div role="contentinfo">
          <ContactsList
            onClickContact={this.displayContactCard}
            contacts={this.props.contacts}
          />
        </div>
        {displayedContact && (
          <ContactCardModal
            hideModal={this.hideContactCard}
            contact={displayedContact}
            onDeleteContact={this.onDeleteContact}
          />
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
