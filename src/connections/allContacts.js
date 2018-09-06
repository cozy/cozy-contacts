import { connect, withMutations } from 'cozy-client'
import flow from 'lodash/flow'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import flatten from 'lodash/flatten'
import mergeWith from 'lodash/mergeWith'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

function removeDuplicates(data) {
  return uniqWith(data, isEqual)
}

function findItems(doctype, selectors) {
  return client =>
    Promise.all(
      selectors.map(selector =>
        client.query(client.find(doctype).where(selector))
      )
    )
      .then(results => results.map(result => result.data))
      .then(flatten)
      .then(removeDuplicates)
}

function selector(attr, prop) {
  return values => ({
    [attr]: {
      $elemMatch: {
        [prop]: {
          $in: values
        }
      }
    }
  })
}

function getValues(array = [], property) {
  return array.map(item => item[property])
}

function createSelector(object, path) {
  const [arrayName, nestedProperty] = path.split('.')
  const arrayOfObject = object[arrayName]
  const values = getValues(arrayOfObject, nestedProperty)
  return selector(arrayName, nestedProperty)(values)
}

function findContactsWithSamePhoneOrEmail(targetContact) {
  const paths = ['phone.number', 'email.address']
  const selectors = paths.map(path => createSelector(targetContact, path))
  return findItems('io.cozy.contacts', selectors)
}

const CONNECTION_NAME = 'allContacts'

export const withContacts = connect(
  client => client.all('io.cozy.contacts').UNSAFE_noLimit(),
  {
    as: CONNECTION_NAME
  }
)

export const withContactsMutations = withMutations(client => ({
  importContact: async attributes => {
    const contacts = await findContactsWithSamePhoneOrEmail(attributes)(client)
    if (contacts.length === 1) {
      const updatedContact = mergeContact(contacts[0], attributes)
      return client.save(updatedContact)
    } else if (contacts.length > 1) {
      throw new Error(
        'Too many contacts found with same email or phone number.'
      )
    }
    return client.create('io.cozy.contacts', attributes, null, {
      updateQueries: {
        [CONNECTION_NAME]: (previousData, result) => [
          ...previousData,
          result.data
        ]
      }
    })
  },
  createContact: attributes =>
    client.create('io.cozy.contacts', attributes, null, {
      updateQueries: {
        [CONNECTION_NAME]: (previousData, result) => [
          ...previousData,
          result.data
        ]
      }
    }),
  updateContact: contact => client.save(contact),
  deleteContact: contact =>
    client.destroy(contact, {
      updateQueries: {
        [CONNECTION_NAME]: (previousData, result) => {
          const idx = previousData.findIndex(c => c.id === result.data.id)
          return [...previousData.slice(0, idx), ...previousData.slice(idx + 1)]
        }
      }
    })
}))

export default flow([withContacts, withContactsMutations])

export function mergeContact(contact, attributes) {
  // TODO: refactor to remove customizer from the mergeContact
  const propertyName = {
    email: 'address',
    phone: 'number'
  }

  function customizer(objValue, srcValue, key) {
    if (Array.isArray(objValue) || Array.isArray(srcValue)) {
      return mergeArrayOnKey(objValue, srcValue, propertyName[key])
    }
    if (key === 'fullname' && objValue && srcValue) {
      return objValue.length > srcValue.length ? objValue : srcValue
    }
  }
  return mergeWith({}, contact, attributes, customizer)
}

/**
 *
 * @param {Array} objValue
 * @param {Array} srcValue
 * @param {String} key
 *
 * var arr1 = [{ x: 1 }];
 * var arr2 = [{ x: 2 }];
 * mergeArrayOnKey(arr1, arr2, 'x')
 * → [{ x: 1 }, { x: 2 }]
 *
 * or
 *
 * var arr1 = [{ x: 1, y: 1 }];
 * var arr2 = [{ x: 1, z: 1 }, { x: 2, z: 2 }];
 * mergeArrayOnKey(arr1, arr2, 'x')
 * → [{ x: 1, y: 1, z: 1 }, { x: 2, z: 2 }]
 */
function mergeArrayOnKey(objValue = [], srcValue = [], key) {
  return map(groupBy(concat(objValue, srcValue), key), vals =>
    merge({}, ...vals)
  )
}
