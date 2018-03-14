import React from "react";
import PropTypes from "prop-types";
import { Button, IntentOpener } from "cozy-ui/react";

const ContactsIntentButton = ({ label }) => (
  <div>
    <IntentOpener
      onComplete={res => {
        alert(`intent has completed: ${JSON.stringify(res)}`);
      }}
      onDismiss={() => {}}
      action="PICK"
      doctype="io.cozy.contacts"
    >
      <Button label={label} />
    </IntentOpener>
  </div>
);
ContactsIntentButton.propTypes = {
  label: PropTypes.string
};
ContactsIntentButton.defaultProps = {
  label: "Select a Contact"
};

export default ContactsIntentButton;
