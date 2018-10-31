import React from 'react'
import { PropTypes } from 'prop-types'
<<<<<<< HEAD
import { Alerter } from 'cozy-ui/react'
import { Main, Content, Layout } from 'cozy-ui/react/Layout'
import { translate } from 'cozy-ui/react/I18n'
import { Query } from 'cozy-client'

import ContactsList from './ContactsList'
=======
import ContactFormModal from './Modals/ContactFormModal'
import { Alerter } from 'cozy-ui/transpiled/react'
import { Main, Content, Layout } from 'cozy-ui/transpiled/react/Layout'
>>>>>>> refacto: Use transpiled UI
import connect from '../connections/allContacts'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import SpinnerContact from './Components/Spinner'
<<<<<<< HEAD
=======
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { IconSprite } from 'cozy-ui/transpiled/react'
import 'cozy-ui/transpiled/stylesheet.css'
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
    this.setState(() => ({
      isImportationDisplayed: true
    }))
  }

  hideImportation = () => {
    this.setState(() => ({ isImportationDisplayed: false }))
  }

  displayContactForm = () => {
    this.setState(() => ({
      isCreationFormDisplayed: true
    }))
  }

  hideContactForm = () => {
    this.setState(() => ({
      isCreationFormDisplayed: false
    }))
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
        this.setState(() => {
          displayedContact
        })
      }
    }
  }
>>>>>>> refacto: Use transpiled UI

class ContactsApp extends React.Component {
  render() {
    const { groups, t } = this.props
    return (
      <Layout monocolumn="true">
        <Main>
          <ContactsSelectionBar trashAction={this.props.deleteContact} />
          <Header right={<Toolbar groups={this.props.groups} />} />
          <Content>
            <ContactsList groups={groups} />
          </Content>
          <Alerter t={t} />
          <ModalManager />
        </Main>
        <IconSprite />
      </Layout>
    )
  }
}
ContactsApp.propTypes = {
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
              return (
                <SpinnerContact
                  size="xxlarge"
                  loadingType="fetching_contacts"
                />
              )
            }
            if (fetchStatus === 'loaded') {
              return <WrappedComponent groups={groups} {...this.props} />
            }
          }}
        </Query>
      )
    }
  }

export default translate()(connect(withContacts(ContactsApp)))
