import React from 'react'
import { PropTypes } from 'prop-types'
import { Alerter } from 'cozy-ui/transpiled/react'
import { Main, Content, Layout } from 'cozy-ui/transpiled/react/Layout'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import ContactsList from './ContactsList'
import { IconSprite } from 'cozy-ui/transpiled/react'
import 'cozy-ui/transpiled/stylesheet.css'
import withContactsMutations from '../connections/allContacts'
import Header from './Header'
import Toolbar from './Toolbar'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import flag, { FlagSwitcher } from 'cozy-flags'
import { initFlags } from '../helpers/flags'
import container from './AppContainer'
import flow from 'lodash/flow'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import { Query } from 'cozy-client'
import SpinnerContact from './Components/Spinner'

const query = client => client.all(DOCTYPE_CONTACTS)

class ContactsApp extends React.Component {
  componentDidMount() {
    initFlags()
    this.props.cleanTrashedGroups()
  }

  render() {
    const { t } = this.props

    return (
      <Layout monocolumn="true">
        <Main>
          {flag('switcher') && <FlagSwitcher />}
          <ContactsSelectionBar trashAction={this.props.deleteContact} />
          <Query query={query}>
            {({ data: contacts, fetchStatus }) => {
              if (fetchStatus === 'loading') {
                return (
                  <>
                    <Header />
                    <Content>
                      <SpinnerContact
                        size="xxlarge"
                        loadingType="fetching_contacts"
                      />
                    </Content>
                  </>
                )
              } else {
                return (
                  <>
                    <Header right={<Toolbar nbContacts={contacts.length} />} />
                    <Content>
                      <ContactsList contacts={contacts} />
                    </Content>
                  </>
                )
              }
            }}
          </Query>
          <Alerter t={t} />
          <ModalManager />
        </Main>
        <IconSprite />
      </Layout>
    )
  }
}
ContactsApp.propTypes = {
  deleteContact: PropTypes.func.isRequired
}

export default flow(
  translate(),
  withContactsMutations,
  container
)(ContactsApp)
