/*global cozy*/
import React from "react";
import PropTypes from "prop-types";
import { translate } from "cozy-ui/react/I18n";
import { Button } from "cozy-ui/react";
import ContactsList from "./ContactsList/ContactsList";
import { withContacts } from "./ContactsList";

const ConnectedContactsList = withContacts(ContactsList);

const IntentHeader = () => (
  <div className="intent-header">
    <h1 className="intent-header-title">
      <img className="intent-header-icon" src="/icon.svg" />
      <span>Cozy</span> <strong>Contacts</strong>
    </h1>
  </div>
);

const IntentFooter = ({ label, onSubmit, onCancel, t }) => (
  <div className="intent-footer">
    <div className="intent-footer-label">{label}</div>
    <Button theme="secondary" onClick={onCancel}>
      {t("cancel")}
    </Button>
    <Button onClick={onSubmit}>{t("confirm")}</Button>
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

  cancel = () => {
    if (this.state.service) {
      this.state.service.terminate({ contacts: [] });
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
    const { t } = this.props;
    return (
      <div className="intent-layout">
        <IntentHeader />
        <IntentMain>
          <ConnectedContactsList
            selection={this.state.selection}
            onSelect={this.toggleSelection}
          />
        </IntentMain>
        <IntentFooter
          t={t}
          onSubmit={this.pickContacts}
          onCancel={this.cancel}
          label={t("selected_contacts", {
            smart_count: this.state.selection.length
          })}
        />
      </div>
    );
  }
}
PickContacts.propTypes = {
  intentId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default translate()(PickContacts);
