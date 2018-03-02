import React from "react";
import PropTypes from "prop-types";
import { sortGivenNameFirst, getDisplayedName } from "./";
import ContactRow from "./ContactRow";

const ContactHeaderRow = props => <div className="divider">{props.header}</div>;
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
  let lastLetter = null;
  const categorizedContacts = sortedContacts.reduce((acc, contact) => {
    const name = getDisplayedName(contact);
    const header = name[0] || "EMPTY";
    if (header !== lastLetter) {
      acc[header] = [];
    }
    acc[header].push(contact);
    lastLetter = header;
    return acc;
  }, {});
  return (
    <div className="list-wrapper">
      <ol className="list-contact">
        {Object.keys(categorizedContacts).map(header => (
          <li key={`cat-${header}`}>
            <ContactHeaderRow key={header} header={header} />
            <ol className="sublist-contact">
              {categorizedContacts[header].map(contact => (
                <li key={`contact-${contact._id}`}>
                  <ContactRow
                    key={contact._id}
                    contact={contact}
                    selection={
                      props.onSelect && {
                        onSelect: () => {
                          props.onSelect(contact);
                        },
                        selected: props.selection.includes(contact)
                      }
                    }
                    onClick={e => props.onClickContact(contact, e)}
                  />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};
ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onClickContact: PropTypes.func,
  onSelect: PropTypes.func,
  selection: PropTypes.array
};
ContactsList.defaultProps = {
  onSelect: null,
  onClickContact: null,
  selection: []
};

export default ContactsList;
