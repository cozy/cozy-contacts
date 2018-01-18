/* global cozy */
import React, { Component } from "react";
import ContactsError from "./ContactsError";

let sampleId = 0;
const sampleContacts = [
  {
    _id: sampleId++,
    name: { givenName: "Amélie", familyName: "Poulain" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Edward", familyName: "Snowden" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Aylin", familyName: "" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Benjamin", familyName: "André" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Bertrand", familyName: "Alevin" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "André", familyName: "Manoukian" },
    avatar: ""
  },
  {
    _id: sampleId++,
    name: { givenName: "Erika", familyName: "Shell" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Brendan", familyName: "Abolivier" },
    avatar: "",
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "COZY", familyName: "" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "EDF", familyName: "" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "CAF", familyName: "" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  },
  {
    _id: sampleId++,
    name: { givenName: "Eric", familyName: "D" },
    avatar: "",
    phone: [{ number: "06 12345678", primary: true }],
    email: [{ address: "jeanneige@mail.com", primary: true }]
  }
];

export const contactSort = (contact, comparedContact) => {
  const firstNameA =
    contact.name && contact.name.givenName
      ? contact.name.givenName.toUpperCase()
      : "";
  const firstNameB = comparedContact.name
    ? comparedContact.name.givenName.toUpperCase()
    : "";

  if (firstNameB === "") return -1;
  if (firstNameA === "") return 1;
  if (firstNameA < firstNameB) return -1;

  if (firstNameA > firstNameB) return 1;

  const lastNameA =
    contact.name && contact.name.familyName
      ? contact.name.familyName.toUpperCase()
      : "";
  const lastNameB =
    comparedContact.name && comparedContact.name.familyName
      ? comparedContact.name.familyName.toUpperCase()
      : "";
  if (lastNameA < lastNameB) return -1;
  if (lastNameA > lastNameB) return 1;
  return 0;
};

export const withContacts = BaseComponent =>
  class WithContacts extends Component {
    state = {
      contacts: sampleContacts,
      error: undefined
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
      this.setState(state => ({ contacts: [...state.contacts, ...contacts] }));
    }

    render() {
      if (this.state.error) {
        return <ContactsError error={this.state.error} />;
      }
      return <BaseComponent contacts={this.state.contacts} />;
    }
  };
