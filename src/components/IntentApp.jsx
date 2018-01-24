/* global cozy */
import React from "react";

import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";
import { Button } from "cozy-ui/react";

const ConnectedContactsList = withContacts(ContactsList);

class IntentHandler extends React.Component {
  state = {
    service: null
  };
  async componentDidMount() {
    cozy.client.intents
      .createService(this.props.intentId, window)
      .then(service => {
        this.setState(state => ({ ...state, service }));
      });
  }

  pickAllContacts = async () => {
    if (this.state.service) {
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
        .filter(contact => contact.email)
        .map(contact => contact._id);
      this.state.service.terminate({ contacts });
    }
  };

  render() {
    return (
      <div>
        <ConnectedContactsList />
        <Button onClick={this.pickAllContacts}>Select All</Button>
      </div>
    );
  }
}

const IntentApp = () => (
  <div className="app-wrapper" style={{ width: "100%" }}>
    <main className="app-content">
      <IntentHandler />
    </main>
  </div>
);

export default IntentApp;
