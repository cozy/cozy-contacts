import React from "react";
import ContactsApp from "./ContactsApp";
import { withContacts } from "./ContactsList";

const ConnectedContactsApp = withContacts(ContactsApp);

const App = () => (
  <div className="app-wrapper c-layout">
    <ConnectedContactsApp />
  </div>
);

export default App;
