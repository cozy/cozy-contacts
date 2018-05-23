import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import { IntentHeader } from "cozy-ui/react";
import ContactForm from "../ContactCard/ContactForm";
import { withContactsMutations } from "../../connections/allContacts";

const IntentMain = ({ children }) => (
  <div className="intent-main">{children}</div>
);
IntentMain.propTypes = {
  children: PropTypes.element.isRequired
};

class CreateContact extends React.Component {
  createContact = async contact => {
    try {
      const me = !!this.props.data.me;
      if (me) contact.metadata.me = true;
      const resp = await this.props.createContact(contact);
      this.props.onTerminate(resp.data);
    } catch (e) {
      this.props.onError("Could not create contact");
    }
  };

  cancel = () => {
    this.props.onCancel();
  };

  render() {
    return (
      <div className="intent-layout">
        <IntentHeader appEditor="Cozy" appName="Contacts" appIcon="/icon.svg" />
        <IntentMain>
          <ContactForm
            onSubmit={this.createContact}
            onCancel={this.cancel}
            footerPortalInto=".intent-footer"
          />
        </IntentMain>
        <div className="intent-footer" />
      </div>
    );
  }
}
CreateContact.propTypes = {
  data: PropTypes.object,
  onTerminate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  createContact: PropTypes.func.isRequired
};
CreateContact.defaultProps = {
  data: {}
};

export default translate()(withContactsMutations(CreateContact));
