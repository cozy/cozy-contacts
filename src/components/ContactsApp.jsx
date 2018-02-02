import React from "react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import ContactsHeader from "./ContactsList/ContactsHeader";
import ContactModal from "./ContactModal/";

const ConnectedContactsList = withContacts(ContactsList);

const contact = {
  _id: "86565765",
  name: {
    givenName: "Tata",
    familyName: "Toto"
  },
  phone: [
    { number: "+33 (x)x xx xx xx xx", primary: true, label: "work" },
    { number: "+33 (x)x xx xx xx xx", primary: false, label: "personal" }
  ],
  email: [{ address: "email", primary: true }],
  birthday: "1976-03-24",
  address: [
    {
      street: "17 rue des fleurs",
      city: "Strasbourg",
      country: "France",
      postcode: "67100",
      primary: true
    }
  ],
  birthdaay: "1976-03-24",
  birthdzebzebzaay: "1976-03-24",
  birthdaayzegzeg: "1976-03-24",
  birthdzfzfeaay: "1976-03-24"
};

const ContactsApp = () => (
  <div>
    <ContactsHeader />
    <ConnectedContactsList />
    <ContactModal contact={contact} />
  </div>
);

export default ContactsApp;
