import { Q, fetchPolicies } from 'cozy-client'

import {
  DOCTYPE_CONTACTS,
  DOCTYPE_CONTACT_GROUPS,
  DOCTYPE_IDENTITIES,
  DOCTYPE_TRIGGERS
} from '../helpers/doctypes'

const defaultFetchPolicy = fetchPolicies.olderThan(86400000) // 24 hours

// Contacts doctype -------------

// When use of "getById", the definition must be wrap in a function,
// so that it is not executed even if the "enabled" option is equal to "false"
export const buildContactsQueryById = id => ({
  definition: () => Q(DOCTYPE_CONTACTS).getById(id),
  options: {
    as: `${DOCTYPE_CONTACTS}/${id}`,
    fetchPolicy: defaultFetchPolicy,
    singleDocData: true,
    enabled: Boolean(id)
  }
})

export const buildIdentitiesQueryByContact = enabled => ({
  definition: Q(DOCTYPE_IDENTITIES),
  options: {
    as: DOCTYPE_IDENTITIES,
    fetchPolicy: defaultFetchPolicy,
    enabled: Boolean(enabled)
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
    as: `${DOCTYPE_CONTACTS}/ByFamilyNameGivenNameEmailCozyUrl`,
    fetchPolicy: defaultFetchPolicy
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
    as: `${DOCTYPE_CONTACTS}/WithoutIndexes`,
    fetchPolicy: defaultFetchPolicy
  }
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
      .indexFields(['_id']),
    options: {
      as: `${DOCTYPE_CONTACTS}/ByEmailAdressOrPhoneNumber${
        addresses ? `/${addresses.join(',')}` : ''
      }${numbers ? `/${numbers.join(',')}` : ''}`,
      fetchPolicy: defaultFetchPolicy
    }
  }
}

export const buildContactsQueryByGroupId = groupId => ({
  definition: () =>
    Q(DOCTYPE_CONTACTS)
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
      .limitBy(1000),
  options: {
    as: `${DOCTYPE_CONTACTS}/byGroupId/${groupId}`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildContactsTrashedQuery = () => ({
  definition: () => Q(DOCTYPE_CONTACTS).partialIndex({ trashed: true }),
  options: {
    as: `${DOCTYPE_CONTACTS}/trashed`,
    fetchPolicy: defaultFetchPolicy
  }
})

// Contact groups doctype -------------

export const buildGroupQueryById = id => ({
  definition: () => Q(DOCTYPE_CONTACT_GROUPS).getById(id),
  options: {
    as: `${DOCTYPE_CONTACT_GROUPS}/${id}`,
    singleDocData: true,
    fetchPolicy: defaultFetchPolicy
  }
})

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
    as: `${DOCTYPE_CONTACT_GROUPS}/withoutTrashed`,
    fetchPolicy: defaultFetchPolicy
  }
})

export const buildContactGroupsTrashedQuery = () => ({
  definition: () => Q(DOCTYPE_CONTACT_GROUPS).partialIndex({ trashed: true }),
  options: {
    as: `${DOCTYPE_CONTACT_GROUPS}/trashed`,
    fetchPolicy: defaultFetchPolicy
  }
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

// #region Service queries
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
// #endregion Service Queries
