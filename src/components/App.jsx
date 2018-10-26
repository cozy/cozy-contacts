import React from 'react'
import ContactsList from './ContactsList'
import withSelection from './HOCs/withSelection'
import { PropTypes } from 'prop-types'
import ContactFormModal from './Modals/ContactFormModal'
import { Alerter } from 'cozy-ui/react'
import { Main, Content, Layout } from 'cozy-ui/react/Layout'
import connect from '../connections/allContacts'
import ContactImportationModal from './ContactImportationModal'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import ContactCardModalConnected from './Modals/ContactCardModalConnected'
import { Query } from 'cozy-client'
import withModal from './HOCs/withModal'
import { ModalManager } from '../helpers/modalManager'
import { Spinner } from 'cozy-ui/react'
import { translate } from 'cozy-ui/react/I18n'
class ContactsApp extends React.Component {
  state = {
    displayedContact: null,
    isImportationDisplayed: false,
    isCreationFormDisplayed: false
  }
  constructor(props, context) {
    super(props, context)
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
    return this.props.showModal(
      <Query query={client => client.get('io.cozy.contacts', contact._id)}>
        {({ data: contact, fetchStatus }) => {
          return (
            <ContactCardModalConnected
              contact={contact}
              isloading={fetchStatus === 'loading'}
              groups={this.props.groups}
            />
          )
        }}
      </Query>
    )
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
    const { isImportationDisplayed, isCreationFormDisplayed } = this.state
    const { groups, t } = this.props
    return (
      <Layout monocolumn="true">
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
              onSelect={this.props.toggleSelection}
              selection={this.props.selection}
              displayImportation={this.displayImportation}
              groups={groups}
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
          <ModalManager />
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
  groups: PropTypes.array.isRequired
}

const withContacts = WrappedComponent =>
  class AppWithGroups extends React.Component {
    render() {
      return (
        <Query query={client => client.find('io.cozy.contacts.groups')}>
          {({ data: groups, fetchStatus }) => {
            if (fetchStatus === 'loading') {
              return <Spinner size="xxlarge" />
            }
            if (fetchStatus === 'loaded') {
              return <WrappedComponent groups={groups} {...this.props} />
            }
          }}
        </Query>
      )
    }
  }

export default translate()(
  connect(withContacts(withSelection(withModal(ContactsApp))))
)
