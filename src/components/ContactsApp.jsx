import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";

const ConnectedContactsList = withContacts(ContactsList);

const ContactsApp = () => (
  <main className="app-content">
    <ContactsHeader />
    <div role="contentinfo">
      <ConnectedContactsList />
    </div>
  </main>
);

export default ContactsApp;
