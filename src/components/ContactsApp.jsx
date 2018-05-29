import React from "react";
import flow from "lodash/flow";
import ContactsList from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import withSelection from "./HOCs/withSelection";
import { PropTypes } from "prop-types";
import OpenContactFormButton from "./Buttons/OpenContactFormButton";
import ContactsIntentButton from "./Buttons/ContactsIntentButton";
import ContactCardModal from "./Modals/ContactCardModal";
import ContactFormModal from "./Modals/ContactFormModal";
import { SelectionBar, Alerter } from "cozy-ui/react";
import {
  withContacts,
  withContactsMutations
} from "../connections/allContacts";
import { getFullContactName } from "../helpers/contacts";
import ContactImportationModal from "./ContactImportation/ContactImportationModal";

const ContactsHeaderWithActions = ({ displayContactForm }, { t }) => (
  <ContactsHeader
    renderActions={() => {
      const fakeintent = new URL(window.location).searchParams.get(
        "fakeintent"
      );
      return (
        <div className="actions">
          {fakeintent !== null && (
            <ContactsIntentButton
              label={"Select a Contact (intent)"}
              action="PICK"
            />
          )}
          {fakeintent !== null && (
            <ContactsIntentButton
              label={"Create a Contact (intent)"}
              action="CREATE"
              data={{ me: true }}
            />
          )}
          <OpenContactFormButton
            onClick={displayContactForm}
            label={t("create_contact")}
          />
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
    isImportationDisplayed: false,
    isCreationFormDisplayed: false
  };

  displayImportation = () => {
    this.setState({
      isImportationDisplayed: true
    });
  };

  hideImportation = () => {
    this.setState({
      isImportationDisplayed: false
    });
  };

  displayContactCard = contact => {
    this.setState({
      displayedContact: contact
    });
  };

  onDeleteContact = contact => {
    this.hideContactCard();
    Alerter.info("delete-confirmation.deleted", {
      name: getFullContactName(contact.name)
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

  componentWillReceiveProps(nextProps) {
    if (this.state.displayedContact) {
      this.setState(state => ({
        ...state,
        displayedContact: nextProps.contacts.find(
          contact => contact._id === state.displayedContact._id
        )
      }));
    }
  }

  render() {
    const {
      displayedContact,
      isImportationDisplayed,
      isCreationFormDisplayed
    } = this.state;
    const { t } = this.context;
    const { contacts, selection, toggleSelection, clearSelection } = this.props;

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
          <ContactsList
            contacts={contacts}
            onClickContact={this.displayContactCard}
            onSelect={toggleSelection}
            selection={selection}
            displayImportation={this.displayImportation}
          />
        </div>
        {isImportationDisplayed && (
          <ContactImportationModal closeAction={this.hideImportation} />
        )}
        {displayedContact && (
          <ContactCardModal
            onClose={this.hideContactCard}
            contact={displayedContact}
            onDeleteContact={this.onDeleteContact}
          />
        )}
        {isCreationFormDisplayed && (
          <ContactFormModal
            onClose={this.hideContactForm}
            title={t("create_contact")}
            onCreateContact={this.onCreateContact}
          />
        )}
        <Alerter t={t} />
      </main>
    );
  }
}
ContactsApp.propTypes = {
  selection: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
};

const ContactAppWithLoading = ({ data, fetchStatus, ...props }) => {
  if (!data) {
    return null;
  }
  if (fetchStatus === "error") {
    return <div>Error</div>;
  }
  return <ContactsApp contacts={data} {...props} />;
};

ContactAppWithLoading.propTypes = {
  data: PropTypes.array,
  fetchStatus: PropTypes.string
};

export default flow([withContacts, withContactsMutations, withSelection])(
  ContactAppWithLoading
);
