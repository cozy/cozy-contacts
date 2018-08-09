import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'cozy-ui/react/I18n'
import { Button, IntentHeader } from 'cozy-ui/react'
import IntentMain from './IntentMain'
import ContactsList from '../ContactsList/ContactsList'
import withSelection from '../HOCs/withSelection'
import { withContacts } from '../../connections/allContacts'

const ContactAppWithLoading = ({ data, fetchStatus, ...props }) => {
  if (!data) {
    return null
  }
  if (fetchStatus === 'error') {
    return <div>Error</div>
  }
  return <ContactsList contacts={data} {...props} />
}
ContactAppWithLoading.propTypes = {
  data: PropTypes.array.isRequired,
  fetchStatus: PropTypes.string.isRequired
}

const ConnectedContactsList = withContacts(ContactAppWithLoading)

const IntentFooter = ({ label, onSubmit, onCancel, t }) => (
  <div className="intent-footer">
    <div className="intent-footer-label">{label}</div>
    <Button theme="secondary" label={t('cancel')} onClick={onCancel} />
    <Button label={t('confirm')} onClick={onSubmit} />
  </div>
)
IntentFooter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  label: PropTypes.string,
  t: PropTypes.func.isRequired
}
IntentFooter.defaultProps = {
  label: ''
}

class PickContacts extends React.Component {
  pickContacts = () => {
    try {
      this.props.onTerminate({
        contacts: this.props.selection.map(contact => contact._id)
      })
    } catch (error) {
      this.props.onError(error)
    }
  }

  cancel = () => {
    this.props.onCancel()
  }

  render() {
    const { t } = this.context
    return (
      <div className="intent-layout">
        <IntentHeader appEditor="Cozy" appName="Contacts" appIcon="/icon.svg" />
        <IntentMain>
          <ConnectedContactsList
            selection={this.props.selection}
            onSelect={this.props.toggleSelection}
            onClickContact={this.props.toggleSelection}
          />
        </IntentMain>
        <IntentFooter
          t={t}
          onSubmit={this.pickContacts}
          onCancel={this.cancel}
          label={t('selected_contacts', {
            smart_count: this.props.selection.length
          })}
        />
      </div>
    )
  }
}
PickContacts.propTypes = {
  selection: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  onTerminate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default translate()(withSelection(PickContacts))
