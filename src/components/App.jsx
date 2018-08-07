import React from 'react'
import ContactsList from './ContactsList'
import withSelection from './HOCs/withSelection'
import { PropTypes } from 'prop-types'
import ContactCardModal from './Modals/ContactCardModal'
import ContactFormModal from './Modals/ContactFormModal'
import { Alerter } from 'cozy-ui/react'
import { Main, Content, Layout } from 'cozy-ui/react/Layout'
import connect from '../connections/allContacts'
import { getFullContactName } from '../helpers/contacts'
import ContactImportationModal from './ContactImportationModal'
import Header from 'components/Header'
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

  componentDidUpdate(prevProps) {
    if (this.state.displayedContact) {
      this.setState(state => ({
        ...state,
        displayedContact: prevProps.contacts.find(
          contact => contact._id === state.displayedContact._id
        )
      }))
    }
  }

  render() {
    const {
      displayedContact,
      isImportationDisplayed,
      isCreationFormDisplayed
    } = this.state
    const { t } = this.context

    return (
      <Layout monocolumn>
        <Main>
          <ContactsSelectionBar
            selection={this.props.selection}
            hideSelectionBar={this.props.clearSelection}
            trashAction={this.props.deleteContact}
          />
          <Header
            right={
              <Toolbar
                openContactForm={this.openContactForm}
                displayVcardImport={this.displayImportation}
              />
            }
          />
          <Content>
            <ContactsList
              contacts={this.props.contacts}
              onClickContact={this.displayContactCard}
              onSelect={this.props.toggleSelection}
              selection={this.props.selection}
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

const withContacts = WrappedComponent =>
  class AppWithContacts extends React.Component {
    render() {
      if (this.props.fetchStatus === 'error') {
        return <div>Global Error</div>
      }
      return (
        <WrappedComponent contacts={this.props.data || []} {...this.props} />
      )
    }
  }

export default connect(withContacts(withSelection(ContactsApp)))
