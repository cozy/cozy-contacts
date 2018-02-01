import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";

const ConnectedContactsList = withContacts(ContactsList);

const ContactsApp = () => (
  <div className="contact">
    <ContactsHeader />
    <ConnectedContactsList />
  </div>
);

export default ContactsApp;
