import React from "react";
import PropTypes from "prop-types";
import { Button, IntentOpener } from "cozy-ui/react";

const ContactsIntentButton = ({ children }) => (
  <div>
    <IntentOpener
      onComplete={res => {
        alert(`intent has completed: ${JSON.stringify(res)}`);
      }}
      onDismiss={() => {}}
      action="PICK"
      doctype="io.cozy.contacts"
    >
      <Button>{children}</Button>
    </IntentOpener>
  </div>
);
ContactsIntentButton.propTypes = {
  children: PropTypes.string
};
ContactsIntentButton.defaultProps = {
  children: "Select a Contact"
};

export default ContactsIntentButton;
