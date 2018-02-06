import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactCard from "./ContactCard/ContactCard";
import Modal, { ModalContent } from "cozy-ui/react/Modal";
import { translate } from "cozy-ui/react/I18n";

const ConnectedContactsList = withContacts(ContactsList);

const TranslatedContactCard = translate()(({ t, ...props }) => (
  <ContactCard title={t("contact_info")} {...props} />
));

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
              <TranslatedContactCard contact={displayedContact} />
            </ModalContent>
          </Modal>
        )}
      </main>
    );
  }
}

export default withContacts(ContactsApp);
