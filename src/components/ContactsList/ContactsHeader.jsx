import React from "react";

const ContactsFilter = () => <div>ContactsFilter</div>;

const ContactsIntentLink = () => <div>ContactsIntentLink</div>;

const ContactsCreationButton = () => <div>ContactsCreationButton</div>;

const ContactsHeader = () => (
  <div style={{ border: "1px dashed silver", margin: "12px 0" }}>
    <h2>ContactsHeader</h2>
    <ContactsFilter />
    <ContactsIntentLink />
    <ContactsCreationButton />
  </div>
);

export default ContactsHeader;
