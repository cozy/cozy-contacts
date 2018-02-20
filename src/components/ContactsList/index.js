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

const cozyHTTP = {
  getContacts: async () => {
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
    return contacts;
  },

  deleteContact: contact =>
    cozy.client.fetchJSON(
      "DELETE",
      `/data/io.cozy.contacts/${contact._id}?rev=${contact._rev}`
    ),

  createContact: contact => cozy.client.data.create("io.cozy.contacts", contact)
};

export const withContacts = BaseComponent =>
  class WithContacts extends Component {
    state = {
      contacts: [],
      error: undefined,
      loading: true
    };

    async componentDidMount() {
      const contacts = await cozyHTTP.getContacts();
      this.setState(state => ({
        ...state,
        contacts: [...state.contacts, ...contacts],
        loading: false
      }));
    }

    createContact = async data => {
      const contact = await cozyHTTP.createContact(data);
      this.setState(state => ({
        ...state,
        contacts: [...state.contacts, contact]
      }));

      return contact;
    };

    deleteContact = async contact => {
      const index = this.state.contacts.indexOf(contact);
      this.setState(state => ({
        ...state,
        contacts: [
          ...state.contacts.slice(0, index),
          ...state.contacts.slice(index + 1)
        ]
      }));
      try {
        const result = await cozyHTTP.deleteContact(contact);
        if (!result.deleted)
          throw new Error("Contact not deleted on the stack");
      } catch (ex) {
        this.setState(state => ({
          ...state,
          contacts: [
            ...state.contacts.slice(0, index),
            contact,
            ...state.contacts.slice(index + 1)
          ]
        }));
        throw ex;
      }
    };

    render() {
      if (this.state.error) {
        return <ContactsError error={this.state.error} />;
      }
      if (this.state.loading) {
        return <div>Loading...</div>;
      }
      return (
        <BaseComponent
          contacts={this.state.contacts}
          createContact={this.createContact}
          deleteContact={this.deleteContact}
          {...this.props}
        />
      );
    }
  };
