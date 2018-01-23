/* global cozy */
import React, { Component } from "react";
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

export const withContacts = BaseComponent =>
  class WithContacts extends Component {
    state = {
      contacts: [],
      error: undefined,
      loading: true
    };

    async componentDidMount() {
      const contactsRaw = await cozy.client
        .fetchJSON("GET", "/data/io.cozy.contacts/_all_docs?include_docs=true")
        .then(data => data.rows)
        .catch(error => {
          this.setState(state => ({ ...state, contacts: [], error }));
        });
      const contacts = (contactsRaw || [])
        .map(row => ({
          ...row.doc
        }))
        .filter(contact => contact.email);
      this.setState(state => ({
        ...state,
        contacts: [...state.contacts, ...contacts],
        loading: false
      }));
    }

    render() {
      if (this.state.error) {
        return <ContactsError error={this.state.error} />;
      }
      if (this.state.loading) {
        return <div>Loading...</div>;
      }
      return <BaseComponent contacts={this.state.contacts} />;
    }
  };
