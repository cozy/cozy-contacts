import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import { Button, IntentHeader } from "cozy-ui/react";

const IntentFooter = ({ onSubmit, onCancel, t }) => (
  <div className="intent-footer">
    <Button theme="secondary" label={t("cancel")} onClick={onCancel} />
    <Button label={t("confirm")} onClick={onSubmit} />
  </div>
);
IntentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};
IntentFooter.defaultProps = {
  label: ""
};

const IntentMain = ({ children }) => (
  <div className="intent-main">{children}</div>
);
IntentMain.propTypes = {
  children: PropTypes.element.isRequired
};

class CreateContact extends React.Component {
  createContact = () => {
    console.log("create contact");
    //    try {
    //      this.props.onTerminate({
    //        contacts: this.props.selection.map(contact => contact._id)
    //      });
    //    } catch (error) {
    //      this.state.service.throw(error);
    //    }
  };

  cancel = () => {
    this.props.onCancel();
  };

  render() {
    const { t } = this.context;
    return (
      <div className="intent-layout">
        <IntentHeader appEditor="Cozy" appName="Contacts" appIcon="/icon.svg" />
        <IntentMain>contact form</IntentMain>
        <IntentFooter
          t={t}
          onSubmit={this.createContact}
          onCancel={this.cancel}
        />
      </div>
    );
  }
}
CreateContact.propTypes = {};

export default translate()(CreateContact);
