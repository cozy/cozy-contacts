import { connect, withMutations } from 'cozy-client'
import flow from 'lodash/flow'
import array from 'lodash/array'
import isEqual from 'lodash/isEqual'

function findContacts(keys, attributes) {
  return client =>
    Promise.all(
      keys.map(async ({ attr, prop }) => {
        const result = await getExistingContactsByProp(
          attributes[attr],
          attr,
          prop,
          client
        )
        return result.data
      })
    )
      .then(results => [].concat(...results))
      .then(results => array.uniqWith(results, isEqual))
}

function getExistingContactsByProp(props = [], attr, prop, client) {
  const values = props.map(item => item[prop])
  const samePropValueForAttribute = {
    [attr]: {
      $elemMatch: {
        [prop]: {
          $in: values
        }
      }
    }
  }
  const samePropValueForAttributeQuery = client
    .find('io.cozy.contacts')
    .where(samePropValueForAttribute)
  return client.query(samePropValueForAttributeQuery)
}

function findContactsWithSamePhoneOrEmail(attributes) {
  const keys = [
    { attr: 'phone', prop: 'number' },
    { attr: 'email', prop: 'address' }
  ]
  return findContacts(keys, attributes)
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
