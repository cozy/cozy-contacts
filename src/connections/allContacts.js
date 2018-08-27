import { connect, withMutations } from 'cozy-client'
import flow from 'lodash/flow'
import array from 'lodash/array'
import isEqual from 'lodash/isEqual'
import flatten from 'lodash/flatten'

function removeDuplicates(data) {
  return array.uniqWith(data, isEqual)
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
  return array.map(getValue(property))
}

function getValue(property) {
  return obj => obj[property]
}

function createSelector(object) {
  return path => {
    const [arrayName, nestedProperty] = path.split('.')
    const arrayOfObject = object[arrayName]
    const values = getValues(arrayOfObject, nestedProperty)
    return selector(arrayName, nestedProperty)(values)
  }
}

function findContactsWithSamePhoneOrEmail(targetContact) {
  const paths = ['phone.number', 'email.address']
  const selectors = paths.map(createSelector(targetContact))
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
  createContact: async attributes => {
    const contacts = await findContactsWithSamePhoneOrEmail(attributes)(client)
    if (contacts.length === 1) {
      // TODO: create a more complex updated contact if we need to merge deep properties together.
      const updatedContact = {
        ...contacts[0],
        ...attributes
      }
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
