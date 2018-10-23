import React from 'react'
import ContactsList from './ContactsList'
import withSelection from './HOCs/withSelection'
import { PropTypes } from 'prop-types'
import ContactFormModal from './Modals/ContactFormModal'
import { Alerter } from 'cozy-ui/react'
import { Main, Content, Layout } from 'cozy-ui/react/Layout'
import connect from '../connections/allContacts'
import { getFullContactName } from '../helpers/contacts'
import ContactImportationModal from './ContactImportationModal'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { translate } from 'cozy-ui/react/I18n'
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

  displayContactForm = () => {
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
      const previouslyDisplayedContact = prevProps.contacts.find(
        contact => contact._id === this.state.displayedContact._id
      )
      const displayedContact = this.props.contacts.find(
        contact => contact._id === this.state.displayedContact._id
      )
      if (
        displayedContact &&
        previouslyDisplayedContact &&
        displayedContact._rev !== previouslyDisplayedContact._rev
      ) {
        this.setState(state => ({
          ...state,
          displayedContact: displayedContact
        }))
      }
    }
  }

  render() {
    const {
      displayedContact,
      isImportationDisplayed,
      isCreationFormDisplayed
    } = this.state
    const { t } = this.props

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
                displayContactForm={this.displayContactForm}
                displayVcardImport={this.displayImportation}
              />
            }
          />
          <Content>
            <ContactsList
              //contacts={this.props.contacts}
              // onClickContact={this.displayContactCard}
              onSelect={this.props.toggleSelection}
              selection={this.props.selection}
              displayImportation={this.displayImportation}
            />
          </Content>
          {isImportationDisplayed && (
            <ContactImportationModal closeAction={this.hideImportation} />
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

export default translate()(connect(withContacts(withSelection(ContactsApp))))
