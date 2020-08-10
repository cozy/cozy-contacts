/* global cozy */
import React from 'react'
import { PropTypes } from 'prop-types'
import flow from 'lodash/flow'
import { Main, Layout, Content } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Title } from 'cozy-ui/transpiled/react/Text'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Query } from 'cozy-client'
import flag, { FlagSwitcher } from 'cozy-flags'

import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import 'cozy-ui/transpiled/react/stylesheet.css'

import withContactsMutations from '../connections/allContacts'
import ContactsSelectionBar from './layout/ContactsSelectionBar'
import { ModalManager } from '../helpers/modalManager'
import { initFlags } from '../helpers/flags'
import container from './AppContainer'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import ContactsListDataLoader from './ContactsList/ContactsListDataLoader'
import Header from './Header'
import Toolbar from './Toolbar'

const query = client =>
  client
    .all(DOCTYPE_CONTACTS)
    .include(['accounts'])
    .where({
      trashed: {
        $exists: false
      },
      _id: {
        $gt: null
      }
    })
    .indexFields(['_id'])

class ContactsApp extends React.Component {
  // HACK to avoid CozyBar error :
  // you tried to use the CozyBar API (BarCenter) but the CozyBar is not initialised yet via cozy.bar.init
  // TODO : TO BE REMOVED
  state = {
    cozyBarHack: false
  }

  componentDidMount() {
    initFlags()
    this.props.cleanTrashedGroups()

    // HACK to be removed
    setTimeout(() => {
      this.setState({ cozyBarHack: true })
    }, 0)
  }

  render() {
    const { BarCenter } = cozy.bar
    const {
      t,
      breakpoints: { isMobile },
      deleteContact
    } = this.props
    const { cozyBarHack } = this.state // HACK to be removed

    return (
      <Layout monocolumn="true">
        {isMobile &&
          cozyBarHack && (
            <BarCenter>
              <Title>
                <span className={'fil-path-title'}>Contacts</span>
              </Title>
            </BarCenter>
          )}
        <Main>
          {flag('switcher') && <FlagSwitcher />}
          <ContactsSelectionBar trashAction={deleteContact} />
          <Query query={query}>
            {({ data: contacts, fetchStatus, hasMore, fetchMore }) => {
              return (
                <>
                  {contacts.length >= 1 && <Header right={<Toolbar />} />}
                  <Content>
                    <ContactsListDataLoader
                      contacts={contacts}
                      fetchStatus={fetchStatus}
                      hasMore={hasMore}
                      fetchMore={fetchMore}
                    />
                  </Content>
                </>
              )
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
  deleteContact: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default flow(
  translate(),
  withContactsMutations,
  container,
  withBreakpoints()
)(ContactsApp)
