import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import flatten from 'lodash/flatten'
import { DOCTYPE_CONTACTS } from './doctypes'

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

export function findContactsWithSamePhoneOrEmail(targetContact) {
  const paths = ['phone.number', 'email.address']
  const selectors = paths.map(path =>
    createSelector(
      targetContact,
      path
    )
  )
  return findItems(DOCTYPE_CONTACTS, selectors)
}
