import { Q, fetchPolicies } from 'cozy-client'
import { DOCTYPE_CONTACTS } from './doctypes'

const olderThan30sec = fetchPolicies.olderThan(30 * 1000)

export const buildContactQuery = id => ({
  definition: () => Q(DOCTYPE_CONTACTS).getById(id),
  options: {
    as: `contactById-${id}`,
    fetchPolicy: olderThan30sec
  }
})

export const queryAllGroups = {
  definition: () =>
    Q('io.cozy.contacts.groups')
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
        ]
      })
      .sortBy([{ name: 'asc' }]),
  options: {
    as: 'allGroups',
    fetchPolicy: olderThan30sec
  }
}
