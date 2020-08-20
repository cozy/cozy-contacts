import React from 'react'
import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import ContactsListDataLoader from './ContactsList/ContactsListDataLoader'
import Header from './Header'
import Toolbar from './Toolbar'
import { Content } from 'cozy-ui/transpiled/react/Layout'
import { Query } from 'cozy-client'

const ContentWrapper = () => (
  <Query
    query={client =>
      client
        .all(DOCTYPE_CONTACTS)
        .include(['accounts'])
        .where({
          $or: [
            {
              trashed: {
                $exists: false
              }
            },
            {
              trashed: false
            }
          ],
          _id: {
            $gt: null
          }
        })
        .indexFields(['_id'])
    }
  >
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
)

export default ContentWrapper
