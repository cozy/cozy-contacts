import React from "react";
import ConnectedContactsList from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import withSelection from "./HOCs/withSelection";
import { PropTypes } from "prop-types";
import OpenContactFormButton from "./Buttons/OpenContactFormButton";
import ContactsIntentButton from "./Buttons/ContactsIntentButton";
import ContactCardModal from "./Modals/ContactCardModal";
import ContactFormModal from "./Modals/ContactFormModal";
import { SelectionBar } from "cozy-ui/react";
import { withDeletion } from "../connections/allContacts";

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

const SelectionBarWithActions = ({
  selected,
  hideSelectionBar,
  trashAction
}) => (
  <SelectionBar
    selected={selected}
    hideSelectionBar={hideSelectionBar}
    actions={{
      trash: {
        action: trashAction
      }
    }}
  />
);
SelectionBarWithActions.propTypes = {
  selected: PropTypes.array.isRequired,
  hideSelectionBar: PropTypes.func.isRequired,
  trashAction: PropTypes.func.isRequired
};

class ContactsApp extends React.Component {
  state = {
    displayedContact: null,
    isCreationFormDisplayed: false
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

  deleteSelectedContacts = async () => {
    const { selection } = this.props;
    const promises = selection.map(contact =>
      this.props.deleteContact(contact)
    );
    await Promise.all(promises);
    this.props.clearSelection();
  };

  render() {
    const { displayedContact, isCreationFormDisplayed } = this.state;
    const { t } = this.context;
    const { selection, toggleSelection, clearSelection } = this.props;

    return (
      <main className="app-content">
        {selection.length > 0 && (
          <SelectionBarWithActions
            selected={selection}
            hideSelectionBar={clearSelection}
            trashAction={this.deleteSelectedContacts}
          />
        )}
        <ContactsHeaderWithActions
          displayContactForm={this.displayContactForm}
        />
        <div role="contentinfo">
          <ConnectedContactsList
            onClickContact={this.displayContactCard}
            onSelect={toggleSelection}
            selection={selection}
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
ContactsApp.propTypes = {
  selection: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired
};

export default withSelection(withDeletion(ContactsApp));
