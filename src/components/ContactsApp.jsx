import React from "react";
import ConnectedContactsList from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import { PropTypes } from "prop-types";
import OpenContactFormButton from "./Buttons/OpenContactFormButton";
import ContactsIntentButton from "./Buttons/ContactsIntentButton";
import ContactCardModal from "./Modals/ContactCardModal";
import ContactFormModal from "./Modals/ContactFormModal";
import { SelectionBar } from "cozy-ui/react";

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
    isCreationFormDisplayed: false,
    selection: []
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

  onCreateContact = contact => {
    this.hideContactForm();
    this.displayContactCard(contact);
  };

  toggleSelection = data => {
    const index = this.state.selection.indexOf(data);
    this.setState(state => ({
      ...state,
      selection:
        index === -1
          ? [...state.selection, data]
          : [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1)
            ]
    }));
  };

  clearSelection = () =>
    this.setState(state => ({
      ...state,
      selection: []
    }));

  render() {
    const { displayedContact, isCreationFormDisplayed, selection } = this.state;
    const { t } = this.context;
    const actions = {
      trash: {
        action: () => {
          console.log("tras shit");
        }
      }
    };

    return (
      <main className="app-content">
        {selection.length > 0 && (
          <SelectionBar
            selected={selection}
            hideSelectionBar={this.clearSelection}
            actions={actions}
          />
        )}
        <ContactsHeaderWithActions
          displayContactForm={this.displayContactForm}
        />
        <div role="contentinfo">
          <ConnectedContactsList
            onClickContact={this.displayContactCard}
            onSelect={this.toggleSelection}
            selection={this.state.selection}
          />
        </div>
        {displayedContact && (
          <ContactCardModal
            onClose={this.hideContactCard}
            contact={displayedContact}
            onDeleteContact={this.hideContactCard}
          />
        )}
        {isCreationFormDisplayed && (
          <ContactFormModal
            onClose={this.hideContactForm}
            title={t("create_contact")}
            onCreateContact={this.onCreateContact}
          />
        )}
      </main>
    );
  }
}
ContactsApp.propTypes = {};

export default ContactsApp;
