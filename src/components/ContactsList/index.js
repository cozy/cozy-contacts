import React from "react";
import PropTypes from "prop-types";
import { withContacts } from "../../connections/allContacts";
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

const ContactsListWithLoading = ({ data, fetchStatus, ...props }) => {
  if (fetchStatus === "error") {
    return <ContactsError error={new Error("Fetch failed")} />;
  }
  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }
  const contacts = data.filter(contact => contact.email);
  return <ContactsList contacts={contacts} {...props} />;
};

ContactsListWithLoading.propTypes = {
  data: PropTypes.array.isRequired,
  fetchStatus: PropTypes.string
};

export default withContacts(ContactsListWithLoading);
