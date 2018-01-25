import React from "react";
import ContactsList from "components/ContactsList/ContactsList";
import { withContacts } from "components/ContactsList";
import ContactsHeader from "components/ContactsList/ContactsHeader";

const ConnectedContactsList = withContacts(ContactsList);
const App = () => (
  <div>
    <ContactsHeader />
    <ConnectedContactsList />
  </div>
);

export default App;
