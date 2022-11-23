import { Q, fetchPolicies } from 'cozy-client'
import { DOCTYPE_CONTACTS, DOCTYPE_CONTACT_GROUPS } from '../helpers/doctypes'

const olderThan30sec = fetchPolicies.olderThan(30 * 1000)

// Contacts doctype -------------

export const buildContactsQueryById = id => ({
  definition: Q(DOCTYPE_CONTACTS).getById(id),
  options: {
    as: `contactById-${id}`,
    fetchPolicy: olderThan30sec,
    singleDocData: true
  }
})

export const buildContactsQueryByFamilyNameGivenNameEmailCozyUrl = () => ({
  definition: Q(DOCTYPE_CONTACTS)
    .include(['accounts'])
    .where({
      'indexes.byFamilyNameGivenNameEmailCozyUrl': {
        $gt: null
      }
    })
    .partialIndex({
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
})

export const buildContactsQueryWithoutIndexes = () => ({
  definition: Q(DOCTYPE_CONTACTS)
    .include(['accounts'])
    .where({
      _id: {
        $gt: null
      }
    })
    .partialIndex({
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
})

// Contact groups doctype -------------

export const buildContactGroupsQuery = () => ({
  definition: Q(DOCTYPE_CONTACT_GROUPS)
    .partialIndex({
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
})
