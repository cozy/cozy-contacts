import React from 'react'
import flow from 'lodash/flow'
import ContactsList from './ContactsList'
import withSelection from './HOCs/withSelection'
import { PropTypes } from 'prop-types'
import ContactCardModal from './Modals/ContactCardModal'
import ContactFormModal from './Modals/ContactFormModal'
import { Alerter } from 'cozy-ui/react'
import { Main, Content, Layout } from 'cozy-ui/react/Layout'
import { withContacts, withContactsMutations } from '../connections/allContacts'
import { getFullContactName } from '../helpers/contacts'
import ContactImportationModal from './ContactImportationModal'
import Toolbar from 'components/Toolbar'
import ContactsSelectionBar from 'components/layout/ContactsSelectionBar'

class ContactsApp extends React.Component {
  state = {
    displayedContact: null,
    isImportationDisplayed: false,
    isCreationFormDisplayed: false
  }

  displayImportation = () => {
    this.setState({
      isImportationDisplayed: true
    })
  }

  hideImportation = () => {
    this.setState({
      isImportationDisplayed: false
    })
  }

  displayContactCard = contact => {
    this.setState({
      displayedContact: contact
    })
  }

  onDeleteContact = contact => {
    this.hideContactCard()
    Alerter.info('delete-confirmation.deleted', {
      name: getFullContactName(contact.name)
    })
  }

  hideContactCard = () => {
    this.setState({
      displayedContact: null
    })
  }

  openContactForm = () => {
    this.setState({
      isCreationFormDisplayed: true
    })
  }

  hideContactForm = () => {
    this.setState({
      isCreationFormDisplayed: false
    })
  }

  onCreateContact = contact => {
    this.hideContactForm()
    this.displayContactCard(contact)
  }

  render() {
    const {
      displayedContact,
      isImportationDisplayed,
      isCreationFormDisplayed
    } = this.state
    const { t } = this.context
    const { contacts, selection, toggleSelection } = this.props

    return (
      <Layout monocolumn>
        <Main>
          <ContactsSelectionBar
            selection={this.props.selection}
            hideSelectionBar={this.props.clearSelection}
            trashAction={this.props.deleteContact}
          />
          <Toolbar openContactForm={this.openContactForm} />
          <Content>
            <ContactsList
              contacts={contacts}
              onClickContact={this.displayContactCard}
              onSelect={toggleSelection}
              selection={selection}
              displayImportation={this.displayImportation}
            />
          </Content>
          {isImportationDisplayed && (
            <ContactImportationModal closeAction={this.hideImportation} />
          )}
          {displayedContact && (
            <ContactCardModal
              onClose={this.hideContactCard}
              contact={displayedContact}
              onDeleteContact={this.onDeleteContact}
            />
          )}
          {isCreationFormDisplayed && (
            <ContactFormModal
              onClose={this.hideContactForm}
              title={t('create_contact')}
              onCreateContact={this.onCreateContact}
            />
          )}
          <Alerter t={t} />
        </Main>
      </Layout>
    )
  }
}
ContactsApp.propTypes = {
  selection: PropTypes.array.isRequired,
  toggleSelection: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}

const ContactAppWithLoading = ({ data, fetchStatus, ...props }) => {
  if (!data) {
    return null
  }
  if (fetchStatus === 'error') {
    return <div>Error</div>
  }
  return <ContactsApp contacts={data} {...props} />
}

ContactAppWithLoading.propTypes = {
  data: PropTypes.array,
  fetchStatus: PropTypes.string
}

export default flow([withContacts, withContactsMutations, withSelection])(
  ContactAppWithLoading
)
