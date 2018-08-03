/* global cozy */
import React from 'react'
import { PropTypes } from 'prop-types'
import { Empty } from 'cozy-ui/react'
import ImportVcardButton from '../Buttons/ImportVcardButton'
import EmptyIcon from '../../assets/icons/empty-contact-list.svg'
import ImportGoogleButton from '../Buttons/ImportGoogleButton'

const vcardEnabled =
  new URL(window.location).searchParams.get('enablevcardimport') !== null

export default class ContactsEmptyList extends React.Component {
  state = {
    hasConnector: false
  }

  componentDidMount() {
    // cozy-client-js is needed for intents
    // we should refactor to not duplicate initialization code (see src/targets/browser/index.jsx)
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    cozy.client.init({
      cozyURL: `${window.location.protocol}//${data.cozyDomain}`,
      token: data.cozyToken
    })
  }

  afterConnection = result => {
    this.setState({ hasConnector: result !== null })
    setTimeout(() => window.location.reload(), 15000)
  }

  render() {
    const { hasConnector } = this.state
    const { t } = this.context

    return (
      <Empty
        className="contacts-empty"
        icon={EmptyIcon}
        title={t('empty.title')}
        text={hasConnector ? t('empty.after') : ''}
      >
        {!hasConnector && (
          <div className="contacts-empty-actions-wrapper">
            <span className="contacts-empty-action">
              <ImportGoogleButton onComplete={this.afterConnection} />
            </span>
            {vcardEnabled && (
              <span className="contacts-empty-action">
                <ImportVcardButton
                  className="contacts-empty-button"
                  onClick={this.props.displayImportation}
                />
              </span>
            )}
          </div>
        )}
      </Empty>
    )
  }
}
ContactsEmptyList.propTypes = {
  displayImportation: PropTypes.func.isRequired
}
