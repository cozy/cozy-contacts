import React, { Children, Component } from "react";
import { translate } from "cozy-ui/react/I18n";

import Spinner from "cozy-ui/react/Spinner";

class IntentHandler extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      error: null,
      service: null,
      status: "creating"
    };

    props.intents
      .createService()
      // Free : easy mocking !
      // Promise.resolve({
      //   getData: () => ({ slug: <konnector slug> }),
      //   getIntent: () => ({ action: 'INSTALL', type: 'io.cozy.apps' }),
      //   terminate: (doc) => { alert(`Installed ${doc.name}`) }
      // })
      .then(service =>
        this.setState({
          status: "created",
          service: service
        })
      )
      .catch(error =>
        this.setState({
          error: error,
          status: "errored"
        })
      );
  }

  render() {
    const { appData, children, t } = this.props;
    const { error, service, status } = this.state;
    const intent = service && service.getIntent();
    const child =
      intent &&
      Children.toArray(children).find(child => {
        const { action, type } = child.props;
        return (
          action === intent.attributes.action && type === intent.attributes.type
        );
      });

    return (
      <div className="app-wrapper">
        <main className="app-content">
          {status === "creating" && <Spinner size="xxlarge" />}
          {error && (
            <div className="coz-error coz-intent-error">
              <p>{t("intent.service.creation.error.title")}</p>
              <p>{error.message}</p>
            </div>
          )}
          {child &&
            // In the future, we may switch here between available intents
            React.cloneElement(child, {
              appData: appData,
              data: service.getData(),
              intent: service.getIntent(),
              onCancel: () => service.cancel(),
              onError: error => service.throw(error),
              onTerminate: app => service.terminate(app)
            })}
        </main>
      </div>
    );
  }
}

export default translate()(IntentHandler);
