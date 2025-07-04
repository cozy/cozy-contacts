import PropTypes from 'prop-types'
import React, { Children, Component } from 'react'

import Empty from 'cozy-ui/transpiled/react/Empty'
import CozyIcon from 'cozy-ui/transpiled/react/Icons/Cozy'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import contactsStyles from '@/styles/contacts.styl'
import intentStyles from '@/styles/intent.styl'

class IntentHandler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      service: null,
      status: 'creating'
    }

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
          status: 'created',
          service: service
        })
      )
      .catch(error =>
        this.setState({
          error: error,
          status: 'errored'
        })
      )
  }

  render() {
    const { appData, children, t } = this.props
    const { error, service, status } = this.state
    const intent = service && service.getIntent()
    const child =
      intent &&
      Children.toArray(children).find(child => {
        const { action, type } = child.props
        return (
          action === intent.attributes.action && type === intent.attributes.type
        )
      })

    return (
      <div className={intentStyles['app-wrapper']}>
        <div className={intentStyles['app-content']}>
          {status === 'creating' && (
            <div className={intentStyles['intent-loader']}>
              <Spinner size="xxlarge" />
            </div>
          )}
          {error && (
            <Empty
              className={contactsStyles['contacts-empty']}
              icon={CozyIcon}
              title={t('intent.service.creation.error.title')}
              text={error.message}
            />
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
        </div>
      </div>
    )
  }
}
IntentHandler.propTypes = {
  appData: PropTypes.object,
  intents: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}
IntentHandler.defaultProps = {
  appData: {}
}

export default translate()(IntentHandler)
