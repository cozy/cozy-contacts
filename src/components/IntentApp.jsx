/* global cozy */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "cozy-ui/react";

import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";

const ConnectedContactsList = withContacts(ContactsList);

class PickContacts extends React.Component {
  state = {
    service: null,
    selection: []
  };
  async componentDidMount() {
    cozy.client.intents
      .createService(this.props.intentId, window)
      .then(service => {
        this.setState(state => ({ ...state, service }));
      });
  }

  pickContacts = async () => {
    if (this.state.service) {
      try {
        this.state.service.terminate({ contacts: this.state.selection });
      } catch (error) {
        this.state.service.throw(error);
      }
    }
  };

  toggleSelection = data => {
    const index = this.state.selection.indexOf(data);
    this.setState(state => ({
      ...state,
      selection:
        index === -1
          ? [...state.selection, data]
          : [
              ...state.selection.slice(0, index),
              ...state.selection.slice(index + 1)
            ]
    }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.pickContacts}>Select</Button>
        <ConnectedContactsList
          selection={this.state.selection}
          onSelect={this.toggleSelection}
        />
      </div>
    );
  }
}
PickContacts.propTypes = {
  intentId: PropTypes.string.isRequired
};

const IntentApp = () => (
  <div className="app-wrapper" style={{ width: "100%" }}>
    <main className="app-content">
      <PickContacts />
    </main>
  </div>
);

export default IntentApp;
