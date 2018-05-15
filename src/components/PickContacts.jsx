/*global cozy*/
import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import { Button, IntentHeader } from "cozy-ui/react";
import ContactsList from "./ContactsList/ContactsList";
import withSelection from "./HOCs/withSelection";
import { withContacts } from "../connections/allContacts";

const ContactAppWithLoading = ({ data, fetchStatus, ...props }) => {
  if (!data) {
    return null;
  }
  if (fetchStatus === "error") {
    return <div>Error</div>;
  }
  return <ContactsList contacts={data} {...props} />;
};

const ConnectedContactsList = withContacts(ContactAppWithLoading);

const IntentFooter = ({ label, onSubmit, onCancel, t }) => (
  <div className="intent-footer">
    <div className="intent-footer-label">{label}</div>
    <Button theme="secondary" label={t("cancel")} onClick={onCancel} />
    <Button label={t("confirm")} onClick={onSubmit} />
  </div>
);
IntentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  label: PropTypes.string,
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

class PickContacts extends React.Component {
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

  pickContacts = async () => {
    if (this.state.service) {
      try {
        this.state.service.terminate({
          contacts: this.props.selection.map(contact => contact._id)
        });
      } catch (error) {
        this.state.service.throw(error);
      }
    }
  };

  cancel = () => {
    if (this.state.service) {
      this.state.service.terminate({ contacts: [] });
    }
  };

  render() {
    const { t } = this.context;
    return (
      <div className="intent-layout">
        <IntentHeader appEditor="Cozy" appName="Contacts" appIcon="/icon.svg" />
        <IntentMain>
          <ConnectedContactsList
            selection={this.props.selection}
            onSelect={this.toggleSelection}
          />
        </IntentMain>
        <IntentFooter
          t={t}
          onSubmit={this.pickContacts}
          onCancel={this.cancel}
          label={t("selected_contacts", {
            smart_count: this.props.selection.length
          })}
        />
      </div>
    );
  }
}
PickContacts.propTypes = {
  intentId: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired
};

export default translate()(withSelection(PickContacts));
