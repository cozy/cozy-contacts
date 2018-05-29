/* global cozy */
import React from "react";
import { PropTypes } from "prop-types";
import { Button, Icon, IntentOpener, Empty } from "cozy-ui/react";
import EmptyIcon from "../../assets/icons/empty-contact-list.svg";
import IconGoogle from "../../assets/icons/connect-google.svg";
// FIXME: import IconTeam from "../../assets/icons/team.svg";
import palette from "cozy-ui/stylus/settings/palette.json";

const IconTeam = "upload";

export default class ContactsEmptyList extends React.Component {
  state = {
    hasConnector: false
  };

  componentWillMount() {
    // cozy-client-js is needed for intents
    const root = document.querySelector("[role=application]");
    const data = root.dataset;
    cozy.client.init({
      cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
      token: data.cozyToken
    });
  }

  afterConnection = result => {
    this.setState({ hasConnector: result !== null });
    setTimeout(() => window.location.reload(), 15000);
  };

  render() {
    const { hasConnector } = this.state;
    const { t } = this.context;

    return (
      <Empty
        className="contacts-empty"
        icon={EmptyIcon}
        title={t("empty.title")}
        text={hasConnector ? t("empty.after") : ""}
      >
        {!hasConnector && (
          <div className="contacts-empty-actions-wrapper">
            <span className="contacts-empty-action">
              <IntentOpener
                action="CREATE"
                doctype="io.cozy.accounts"
                options={{ slug: "google" }}
                onComplete={this.afterConnection}
              >
                <Button
                  className="contacts-empty-button"
                  icon={IconGoogle}
                  label={t("empty.google")}
                  theme="secondary"
                />
              </IntentOpener>
            </span>
            <span className="contacts-empty-action">
              <Button
                className="contacts-empty-button"
                icon={<Icon icon={IconTeam} color={palette.coolGrey} />}
                label={t("empty.importation")}
                theme="secondary"
                onClick={this.props.displayImportation}
              />
            </span>
          </div>
        )}
      </Empty>
    );
  }
}
ContactsEmptyList.propTypes = {
  displayImportation: PropTypes.func.isRequired
};
