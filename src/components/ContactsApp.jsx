import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import { PropTypes } from "prop-types";
import OpenContactFormButton from "./Buttons/OpenContactFormButton";
import ContactsIntentButton from "./Buttons/ContactsIntentButton";
import ContactCardModal from "./Modals/ContactCardModal";
import ContactFormModal from "./Modals/ContactFormModal";

const ContactsHeaderWithActions = ({ displayContactForm }, { t }) => (
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
          <OpenContactFormButton onClick={displayContactForm}>
            {t("create_contact")}
          </OpenContactFormButton>
        </div>
      );
    }}
  />
);
ContactsHeaderWithActions.propTypes = {
  displayContactForm: PropTypes.func.isRequired
};

class ContactsApp extends React.Component {
  state = {
    displayedContact: null,
    isCreationFormDisplayed: true
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

  displayContactForm = () => {
    this.setState({
      isCreationFormDisplayed: true
    });
  };

  hideContactForm = () => {
    this.setState({
      isCreationFormDisplayed: false
    });
  };

  onCreateContact = async data => {
    const contact = await this.props.createContact(data);
    this.hideContactForm();
    this.displayContactCard(contact);
  };

  onDeleteContact = contact => {
    this.props.deleteContact(contact);
    this.hideContactCard();
  };

  render() {
    const { displayedContact, isCreationFormDisplayed } = this.state;
    const { t } = this.context;

    return (
      <main className="app-content">
        <ContactsHeaderWithActions
          displayContactForm={this.displayContactForm}
        />
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
        {isCreationFormDisplayed && (
          <ContactFormModal
            hideModal={this.hideContactForm}
            title={t("create_contact")}
            createContact={this.onCreateContact}
          />
        )}
      </main>
    );
  }
}
ContactsApp.propTypes = {
  contacts: PropTypes.array,
  createContact: PropTypes.func,
  deleteContact: PropTypes.func
};

export default ContactsApp;
