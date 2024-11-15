import difference from 'lodash/difference'
import isEqual from 'lodash/isEqual'

import {
  getHasManyItems,
  setHasManyItem,
  removeHasManyItem
} from 'cozy-client/dist/associations/HasMany'
import minilog from 'cozy-minilog'

import { DOCTYPE_CONTACTS } from '../helpers/doctypes'
import { buildContactsQueryById } from '../queries/queries'

const log = minilog('connections/relatedRelationships')

const RELATED_RELATION_TYPES_MAPPING = {
  parent: 'child',
  child: 'parent',
  sibling: 'sibling',
  spouse: 'spouse',
  coResident: 'coResident',
  friend: 'friend',
  colleague: 'colleague',
  coWorker: 'coWorker',
  acquaintance: 'acquaintance',
  helper: 'recipient',
  recipient: 'helper',
  related: 'related' // default value
}

/**
 * @param {string[]} relationTypes - Relation types
 */
const getRelationTypesMapping = relationTypes => {
  return relationTypes.map(relationType => {
    return RELATED_RELATION_TYPES_MAPPING[relationType]
  })
}

/**
 * @param {import('cozy-client/types/types').IOCozyContact} oldContact - Old contact
 * @param {import('cozy-client/types/types').IOCozyContact} updatedContact - Updated contact
 * @returns {boolean} - True if related relationships are the same
 */
export const isSameRelatedRelationships = (oldContact, updatedContact) => {
  return isEqual(
    getHasManyItems(oldContact, 'related'),
    getHasManyItems(updatedContact, 'related')
  )
}

/**
 * @param {import('cozy-client/types/types').IOCozyContact} oldContact - Old contact
 * @param {import('cozy-client/types/types').IOCozyContact} updatedContact - Updated contact
 * @returns {import('../types').RelatedRelationshipsToUpdate[]|null} - Related relationships to update
 */
export const getRelatedRelationshipsToUpdate = (oldContact, updatedContact) => {
  const isSameRelatedContactRelationships = isSameRelatedRelationships(
    oldContact,
    updatedContact
  )
  if (isSameRelatedContactRelationships) {
    return null
  }

  const newRelatedRel = getHasManyItems(updatedContact, 'related')
  const oldRelatedRel = getHasManyItems(oldContact, 'related')
  const relatedRelToUpdate = []

  // Find updated or deleted related contacts
  oldRelatedRel.forEach(oldRel => {
    const newRel = newRelatedRel.find(newRel => newRel._id === oldRel._id)

    if (!newRel) {
      relatedRelToUpdate.push({
        type: 'DELETE',
        relation: oldRel
      })
    } else {
      const oldRelationTypes = oldRel.metadata.relationTypes
      const newRelationTypes = newRel.metadata.relationTypes

      const addedRelationTypes = difference(newRelationTypes, oldRelationTypes)
      const removedRelationTypes = difference(
        oldRelationTypes,
        newRelationTypes
      )

      if (addedRelationTypes.length > 0 || removedRelationTypes.length > 0) {
        relatedRelToUpdate.push({
          type: 'UPDATE',
          relation: newRel
        })
      }
    }
  })

  // Find new related contacts
  newRelatedRel.forEach(newRel => {
    const oldRel = oldRelatedRel.find(oldRel => oldRel._id === newRel._id)
    if (!oldRel) {
      relatedRelToUpdate.push({
        type: 'CREATE',
        relation: newRel
      })
    }
  })

  if (relatedRelToUpdate.length === 0) {
    return null
  }

  return relatedRelToUpdate
}

/**
 * Make the new related object converted for the related contact
 * @param {import('cozy-client/types/types').IOCozyContact} originalContactRelation - Original contact relation
 * @param {string} originalContactId - Original contact id
 */
export const makeRelationMapping = (
  originalContactRelation,
  originalContactId
) => {
  const relationTypesMapping = getRelationTypesMapping(
    originalContactRelation.metadata.relationTypes
  )
  return {
    _id: originalContactId,
    _type: DOCTYPE_CONTACTS,
    metadata: {
      relationTypes: relationTypesMapping
    }
  }
}

/**
 * @param {Object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient
 * @param {import('../types').RelatedRelationships} params.relation - Related relationships to update
 * @param {string} params.originalContactId - Original contact id
 * @returns {Promise<import('cozy-client/types/types').IOCozyContact[]>} - Related contacts
 */
export const createRelatedContact = async ({
  client,
  relation,
  originalContactId
}) => {
  try {
    const contactsQueryById = buildContactsQueryById(relation._id)
    const { data: relatedContact } = await client.query(
      contactsQueryById.definition()
    )
    const relationConverted = makeRelationMapping(relation, originalContactId)
    const updatedRelatedContact = setHasManyItem(
      relatedContact,
      'related',
      originalContactId,
      relationConverted
    )

    return updatedRelatedContact
  } catch (error) {
    log.error('Error creating related contact', error)
  }
}

/**
 * @param {Object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient
 * @param {import('../types').RelatedRelationships} params.relation - Related relationships to update
 * @param {string} params.originalContactId - Original contact id
 * @returns {Promise<import('cozy-client/types/types').IOCozyContact[]>} - Related contacts
 */
export const updateRelatedContact = async ({
  client,
  relation,
  originalContactId
}) => {
  try {
    const contactsQueryById = buildContactsQueryById(relation._id)
    const { data: relatedContact } = await client.query(
      contactsQueryById.definition()
    )
    const relationConverted = makeRelationMapping(relation, originalContactId)
    const updatedRelatedContact = setHasManyItem(
      relatedContact,
      'related',
      originalContactId,
      relationConverted
    )

    return updatedRelatedContact
  } catch (error) {
    log.error('Error updating related contact', error)
  }
}

/**
 * @param {Object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient
 * @param {import('../types').RelatedRelationships} params.relation - Related relationships to update
 * @param {string} params.originalContactId - Original contact id
 * @returns {Promise<import('cozy-client/types/types').IOCozyContact[]>} - Related contacts
 */
export const deleteRelatedContact = async ({
  client,
  relation,
  originalContactId
}) => {
  try {
    const contactsQueryById = buildContactsQueryById(relation._id)
    const { data: relatedContact } = await client.query(
      contactsQueryById.definition()
    )
    const updatedRelatedContact = removeHasManyItem(
      relatedContact,
      'related',
      originalContactId
    )

    return updatedRelatedContact
  } catch (error) {
    log.error('Error deleting related contact', error)
  }
}

/**
 * @param {Object} params
 * @param {import('cozy-client/types/CozyClient').default} params.client - CozyClient
 * @param {import('../types').RelatedRelationshipsToUpdate[]} params.relatedRelationships - Related relationships to update
 * @param {import('cozy-client/types/types').IOCozyContact} params.originalContact - Original contact
 */
export const updateRelatedRelationships = async ({
  client,
  relatedRelationships,
  originalContactId
}) => {
  return Promise.all(
    relatedRelationships.map(relatedRel => {
      switch (relatedRel.type) {
        case 'CREATE':
          return createRelatedContact({
            client,
            relation: relatedRel.relation,
            originalContactId
          })
        case 'UPDATE':
          return updateRelatedContact({
            client,
            relation: relatedRel.relation,
            originalContactId
          })
        case 'DELETE':
          return deleteRelatedContact({
            client,
            relation: relatedRel.relation,
            originalContactId
          })
      }
    })
  )
}
