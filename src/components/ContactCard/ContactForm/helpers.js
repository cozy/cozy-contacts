import isEqual from 'lodash/isEqual'
import merge from 'lodash/merge'

import { Association } from 'cozy-client'

import contactToFormValues from './contactToFormValues'
import {
  DOCTYPE_CONTACTS,
  relatedContactTypes
} from '../../../helpers/doctypes'

/**
 * @param {object} [item] - Contact attribute
 * @returns {string} Stringified object
 */
export const makeItemLabel = item => {
  if (!item) return undefined

  const res =
    item.label || item.type
      ? JSON.stringify({ type: item.type, label: item.label })
      : undefined

  return res
}

/**
 *
 * @param {string} [itemLabel] - Value of the label for a contact attribute
 * @returns {{ type?: string, label?: string }}
 */
export const makeTypeAndLabel = itemLabel => {
  if (!itemLabel) {
    return { type: undefined, label: undefined }
  }

  const itemLabelObj = JSON.parse(itemLabel)

  const res = { type: itemLabelObj.type, label: itemLabelObj.label }

  return res
}

/**
 * @param {object} addressField
 * @returns {boolean} True if addressField has extended address
 */
export const hasExtendedAddress = addressField => {
  if (!addressField) return false
  const extendedAddressKeys = [
    'addresslocality',
    'addressbuilding',
    'addressstairs',
    'addressfloor',
    'addressapartment',
    'addressentrycode'
  ]
  return Object.keys(addressField).some(ext =>
    extendedAddressKeys.includes(ext)
  )
}

export const moveToHead = shouldBeHead => items =>
  items.reduce((arr, v) => (shouldBeHead(v) ? [v, ...arr] : [...arr, v]), [])

export const movePrimaryToHead = moveToHead(v => v?.primary)

export const createAddress = ({ address, oldContact, t }) => {
  return address
    ? address
        .filter(val => val && val.address)
        .map((addressField, index) => {
          const oldContactAddress = oldContact?.address?.[index]
          const oldContactFormValues = contactToFormValues(oldContact, t)
            ?.address?.[index]

          const addressHasBeenModified = !isEqual(
            addressField,
            oldContactFormValues
          )

          if (addressHasBeenModified) {
            // Use "code" instead "postcode", to be vcard 4.0 rfc 6350 compliant
            // eslint-disable-next-line no-unused-vars
            const { postcode, ...oldContactAddressCleaned } =
              oldContactAddress || {}
            return {
              // For keep other properties form connectors
              ...oldContactAddressCleaned,
              formattedAddress: addressField.address,
              number: addressField.addressnumber,
              street: addressField.addressstreet,
              code: addressField.addresscode,
              city: addressField.addresscity,
              region: addressField.addressregion,
              country: addressField.addresscountry,
              ...(hasExtendedAddress(addressField) && {
                extendedAddress: {
                  ...oldContactAddressCleaned.extendedAddress,
                  locality: addressField.addresslocality,
                  building: addressField.addressbuilding,
                  stairs: addressField.addressstairs,
                  floor: addressField.addressfloor,
                  apartment: addressField.addressapartment,
                  entrycode: addressField.addressentrycode
                }
              }),
              ...makeTypeAndLabel(addressField.addressLabel),
              primary: index === 0
            }
          }
          return oldContactAddress
        })
    : []
}

/**
 * @param {(import('../../../types').RelatedContact|undefined)[]} relatedContact - The related contacts array
 * @returns {Record<string, { data: { _id: string, _type: string }[] }>} - The related contacts relationships
 */
export const getRelatedContactRelationships = relatedContact => {
  // Tips filter Boolean to remove undefined value from array when relatedContact is empty (see contactToFormValues)
  return relatedContact.filter(Boolean).reduce((acc, rel) => {
    const relationType = rel.relatedContactLabel
      ? JSON.parse(rel.relatedContactLabel).type
      : 'related'

    if (rel.relatedContactId) {
      acc[relationType] = {
        data: [
          {
            _id: rel.relatedContactId,
            _type: DOCTYPE_CONTACTS
          }
        ]
      }
    }
    return acc
  }, {})
}

/**
 * When changing the type of relationship, it must be ensured that no empty relationship remains.
 * The old and new ones are merged into `formValuesToContact`.
 *
 * @param {import('cozy-client/types/types').IOCozyContact} contact - The contact object with all relationships
 * @returns {import('cozy-client/types/types').IOCozyContact} - The contact object without the related contacts relationships
 */
export const cleanRelatedContactRelationships = contact => {
  if (!contact?.relationships) return {}
  const updatedContact = merge({}, contact)

  const relationshipsWithoutRelatedContact = Object.entries(
    updatedContact.relationships
  ).reduce((acc, [relName, relValue]) => {
    if (!relatedContactTypes.includes(relName)) {
      acc[relName] = relValue
    }
    return acc
  }, {})

  updatedContact.relationships = relationshipsWithoutRelatedContact

  return updatedContact
}

// TODO : Update dehydrate function to HasMany class in cozy-client
/**
 * This function is used to clean the contact object from the associated data
 * cozy-client dehydrates the document before saving it (via the `HasMany` method), but by doing it manually, we ensure that all hydrated relationships in the document (and without data of course) are not saved in the `relationships` of the document, which adds unnecessary data.
 *
 * @param {import('cozy-client/types/types').IOCozyContact} contact - The contact object with associated data
 * @returns {import('cozy-client/types/types').IOCozyContact} - The contact object without associated data
 */
export const cleanAsscociatedData = contact => {
  if (!contact) return {}
  return Object.entries(contact).reduce((cleanedContact, [key, value]) => {
    // Add `groups` condition to keep the old implementation functional, see below
    if (!(value instanceof Association) || key === 'groups') {
      cleanedContact[key] = value
    }
    return cleanedContact
  }, {})
}

/**
 * @param {import('cozy-client/types/types').IOCozyContact} contact
 * @returns {import('../../../types').RelatedContact[]}
 */
export const makeRelatedContact = contact => {
  const res = Object.entries(contact).reduce((acc, [attr, value]) => {
    if (
      relatedContactTypes.includes(value.name) &&
      value instanceof Association
    ) {
      for (const relContact of value.data) {
        acc.push({
          relatedContactId: relContact._id,
          relatedContact: relContact.displayName,
          relatedContactLabel: makeItemLabel({
            // Useful for not having a value in the "value" attribute of the input
            type: value.name === 'related' ? '' : attr
          })
        })
      }
    }
    return acc
  }, [])

  return res.length > 0 ? res : [undefined]
}
