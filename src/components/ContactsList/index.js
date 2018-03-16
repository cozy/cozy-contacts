import React from "react";
import PropTypes from "prop-types";
import ContactsList from "./ContactsList";
import ContactsError from "./ContactsError";

export function getDisplayedName(contact) {
  const givenNameA =
    contact.name && contact.name.givenName
      ? contact.name.givenName.toUpperCase()
      : "";
  const familyNameA =
    contact.name && contact.name.familyName
      ? contact.name.familyName.toUpperCase()
      : "";
  const nameA = `${givenNameA} ${familyNameA}`.trim();
  return nameA;
}

export const sortGivenNameFirst = (contact, comparedContact) => {
  const nameA = getDisplayedName(contact);
  const nameB = getDisplayedName(comparedContact);
  if (nameA === "") return 1;
  if (nameB === "") return -1;

  return nameA.localeCompare(nameB);
};

export default ContactsList;
