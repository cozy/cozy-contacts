import { Q, fetchPolicies } from 'cozy-client'
import {
  DOCTYPE_CONTACTS,
  DOCTYPE_CONTACT_GROUPS,
  DOCTYPE_TRIGGERS
} from '../helpers/doctypes'

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

export const buildContactsQueryByUpdatedAtGT = date => ({
  definition: Q(DOCTYPE_CONTACTS)
    .where({
      $or: [
        {
          cozyMetadata: { $exists: false }
        },
        {
          'cozyMetadata.updatedAt': { $gt: date }
        }
      ]
    })
    .partialIndex({
      trashed: {
        $exists: false
      }
    })
    .indexFields(['_id'])
    .limitBy(1000)
})

export const buildContactsQueryByEmailAdressOrPhoneNumber = (
  addresses,
  numbers
) => {
  return {
    definition: Q(DOCTYPE_CONTACTS)
      .where({
        _id: {
          $gt: null
        },
        $or: [
          {
            email: {
              $elemMatch: {
                address: {
                  $in: addresses
                }
              }
            }
          },
          {
            phone: {
              $elemMatch: {
                number: {
                  $in: numbers
                }
              }
            }
          }
        ]
      })
      .partialIndex({
        $or: [
          {
            email: {
              $exists: true
            }
          },
          {
            phone: {
              $exists: true
            }
          }
        ]
      })
      .indexFields(['_id'])
  }
}

export const buildContactsQueryByGroupId = groupId => ({
  definition: Q(DOCTYPE_CONTACTS)
    .where({
      relationships: {
        groups: {
          data: {
            $elemMatch: {
              _id: groupId,
              _type: DOCTYPE_CONTACT_GROUPS
            }
          }
        }
      }
    })
    .indexFields(['relationships.groups.data'])
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

export const buildContactGroupsTrashedQuery = () => ({
  definition: Q(DOCTYPE_CONTACT_GROUPS).partialIndex({ trashed: true })
})

// Triggers doctype -------------

export const buildTriggersQueryByName = name => ({
  definition: Q(DOCTYPE_TRIGGERS)
    .where({
      'message.name': name
    })
    .indexFields(['message.name'])
})

export const buildTriggersQueryById = id => ({
  definition: Q(DOCTYPE_TRIGGERS).getById(id)
})
