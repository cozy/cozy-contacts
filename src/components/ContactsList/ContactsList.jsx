import React from "react";
import PropTypes from "prop-types";
import { sortGivenNameFirst, getDisplayedName } from "./";
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
  const sortedContacts = [...props.contacts].sort(sortGivenNameFirst);
  const rows = [];
  let lastLetter = null;
  sortedContacts.forEach(contact => {
    const name = getDisplayedName(contact);
    if (name[0] !== lastLetter) {
      rows.push(<ContactHeaderRow header={name[0] || "EMPTY"} />);
    }
    rows.push(
      <ContactRow
        key={contact._id}
        contact={contact}
        selection={
          props.onSelect && {
            onSelect: () => {
              props.onSelect(contact._id);
            },
            selected: props.selection.includes(contact._id)
          }
        }
      />
    );
    lastLetter = name[0];
  });
  return <div>{rows}</div>;
};
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  selection: PropTypes.array
};
ContactsList.defaultProps = {
  onSelect: null,
  selection: []
};

export default ContactsList;
