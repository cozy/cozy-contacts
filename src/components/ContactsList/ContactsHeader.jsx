import React, { Component } from "react";
import { Button, IntentOpener } from "cozy-ui/react";

const ContactsFilter = () => <div>ContactsFilter</div>;

const ContactsCreationButton = () => <div>ContactsCreationButton</div>;

class ContactsIntentLink extends Component {
  render() {
    return (
      <div>
        <IntentOpener
          onComplete={res => {
            alert(`intent has completed: ${JSON.stringify(res)}`);
          }}
          onDismiss={() => {}}
          action="PICK"
          doctype="io.cozy.contacts"
        >
          <Button>Select a contact</Button>
        </IntentOpener>
      </div>
    );
  }
}

const ContactsHeader = () => {
  const fakeintent = new URL(window.location).searchParams.get("fakeintent");
  return (
    <div className="topbar">
      <h2>ContactsHeader</h2>
      <ContactsFilter />
      {fakeintent !== null && <ContactsIntentLink />}
      <ContactsCreationButton />
    </div>
  );
};

export default ContactsHeader;
