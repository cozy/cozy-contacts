import React from 'react'
import { PropTypes } from 'prop-types'
import { Alerter } from 'cozy-ui/transpiled/react'
import { Main, Content, Layout } from 'cozy-ui/transpiled/react/Layout'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Query } from 'cozy-client'
import ContactsList from './ContactsList'
import { IconSprite } from 'cozy-ui/transpiled/react'
import 'cozy-ui/transpiled/stylesheet.css'
import connect from '../connections/allContacts'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import SpinnerContact from './Components/Spinner'
import flag, { FlagSwitcher } from 'cozy-flags'
import { initFlags } from '../helpers/flags'

class ContactsApp extends React.Component {
  componentWillMount() {
    initFlags()
  }

  render() {
    const { groups, t } = this.props
    return (
      <Layout monocolumn="true">
        <Main>
          {flag('switcher') && <FlagSwitcher />}
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
