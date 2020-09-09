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
      .sortBy([{ name: 'asc' }])
      .indexFields(['name']),
  options: {
    as: 'allGroups',
    fetchPolicy: olderThan30sec
  }
}

export const contactsByFamilyNameGivenNameEmailCozyUrl = {
  definition: () =>
    Q(DOCTYPE_CONTACTS)
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
        'indexes.byFamilyNameGivenNameEmailCozyUrl': {
          $exists: true
        }
      })
      .indexFields(['indexes.byFamilyNameGivenNameEmailCozyUrl'])
      .sortBy([{ 'indexes.byFamilyNameGivenNameEmailCozyUrl': 'asc' }])
      .limitBy(1000),
  options: {
    as: 'contactsByFamilyNameGivenNameEmailCozyUrl'
  }
}

export const contactsWithoutIndexes = {
  definition: () =>
    Q(DOCTYPE_CONTACTS)
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
        'indexes.byFamilyNameGivenNameEmailCozyUrl': {
          $exists: false
        }
      })
      .indexFields(['_id'])
      .limitBy(1000),
  options: {
    as: 'contactsWithoutIndexes'
  }
}
