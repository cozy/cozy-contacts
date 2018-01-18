import React from "react";
import PropTypes from "prop-types";
import { contactSort } from "./";
import ContactRow from "./ContactRow";

const ContactHeaderRow = props => (
  <div className="contact-header">{props.header}</div>
);
ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
};

const ContactsEmptyList = () => (
  <div>
    <p>No Contact</p>
    <p>Try to create one with the big button on the top</p>
    <p>
      Or to import your contacts with this <a href="#">link</a>
    </p>
  </div>
);

const ContactsList = props => {
  if (props.contacts.length === 0) {
    return <ContactsEmptyList />;
  }
  const sortedContacts = [...props.contacts].sort(contactSort);
  return (
    <div>
      <ContactHeaderRow header="A" />
      {sortedContacts.map(contact => (
        <ContactRow key={contact._id} contact={contact} />
      ))}
    </div>
  );
};
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired
};

export default ContactsList;
