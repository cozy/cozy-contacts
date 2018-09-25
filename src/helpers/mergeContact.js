import mergeWith from 'lodash/mergeWith'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

export function mergeContact(contact, attributes) {
  return mergeWith({}, contact, attributes, customizer)
}

const strategies = {
  email: mergeArrayOfObject('address'),
  phone: mergeArrayOfObject('number'),
  givenName: keepLonger,
  familyName: keepLonger
}

const fromStrategies = strategies => (objValue, srcValue, key) =>
  strategies[key] ? strategies[key](objValue, srcValue, key) : undefined

const customizer = fromStrategies(strategies)

function mergeArrayOfObject(key) {
  return (objValue, srcValue) => {
    return mergeArrayOnKey(objValue, srcValue, key)
  }
}

function keepLonger(objValue = '', srcValue = '') {
  return objValue.length > srcValue.length ? objValue : srcValue
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
