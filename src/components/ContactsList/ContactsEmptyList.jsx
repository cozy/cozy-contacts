/* global cozy */
import React from "react";
import { Button, IntentOpener } from "cozy-ui/react";

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
      <div className="list-empty">
        <h1>{t("empty.title")}</h1>

        {hasConnector ? (
          <p>{t("empty.after")}</p>
        ) : (
          <IntentOpener
            action="CREATE"
            doctype="io.cozy.accounts"
            options={{ slug: "google" }}
            onComplete={this.afterConnection}
          >
            <Button label={t("empty.google")} />
          </IntentOpener>
        )}
      </div>
    );
  }
}
