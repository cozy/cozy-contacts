/* global cozy */
import React from 'react'
import { PropTypes } from 'prop-types'
import flow from 'lodash/flow'
import { Main, Layout, Content } from 'cozy-ui/transpiled/react/Layout'
import { Alerter, Title } from 'cozy-ui/transpiled/react'
import withBreakpoints from 'cozy-ui/react/helpers/withBreakpoints'

import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Query } from 'cozy-client'
import flag, { FlagSwitcher } from 'cozy-flags'

import { IconSprite } from 'cozy-ui/transpiled/react'
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
  componentDidMount() {
    initFlags()
    this.props.cleanTrashedGroups()
  }

  render() {
    const { BarCenter } = cozy.bar
    const {
      t,
      breakpoints: { isMobile },
      deleteContact
    } = this.props

    return (
      <Layout monocolumn="true">
        {isMobile && (
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
            {({
              data: contacts,
              fetchStatus: fetchStatusContact,
              hasMore,
              fetchMore
            }) => {
              return (
                <Query
                  query={client =>
                    client
                      .find('io.cozy.contacts.groups')
                      .where({
                        trashed: { $exists: false }
                      })
                      .sortBy([{ name: 'asc' }])
                      .indexFields(['name'])
                  }
                >
                  {({
                    data: allGroups,
                    fetchStatus: allGroupsContactStatus
                  }) => {
                    const fetchStatus =
                      fetchStatusContact !== 'loaded' ||
                      allGroupsContactStatus !== 'loaded'
                        ? 'loading'
                        : 'loaded'

                    return (
                      <>
                        {contacts.length >= 1 && <Header right={<Toolbar />} />}
                        <Content>
                          <ContactsListDataLoader
                            contacts={contacts}
                            allGroups={allGroups}
                            fetchStatus={fetchStatus}
                            hasMore={hasMore}
                            fetchMore={fetchMore}
                          />
                        </Content>
                      </>
                    )
                  }}
                </Query>
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
