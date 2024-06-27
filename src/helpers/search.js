import Fuse from 'fuse.js'
import debounce from 'lodash/debounce'

import flag from 'cozy-flags'

// See https://www.fusejs.io/api/options.html#threshold
// 0.0 is exact-matching, 1.0 is *
const DEFAULT_FUZZY_THRESHOLD = 0.1

const fuseOptions = {
  findAllMatches: true,
  threshold: DEFAULT_FUZZY_THRESHOLD,
  ignoreLocation: true,
  ignoreFieldNorm: true,
  keys: [
    {
      name: 'name.familyName',
      weight: 10
    },
    {
      name: 'name.givenName',
      weight: 9
    },
    {
      name: 'fullname',
      weight: 8
    },
    {
      name: 'email.address',
      weight: 7
    },
    {
      name: 'phone.number',
      weight: 6
    },
    {
      name: 'cozy.url',
      weight: 5
    },
    {
      name: 'company',
      weight: 4
    },
    {
      name: 'jobTitle',
      weight: 3
    },
    {
      name: 'address.formattedAddress',
      weight: 2
    },
    {
      name: 'note',
      weight: 1
    }
  ]
}

const fuse = new Fuse([], fuseOptions)

/**
 * Sort contacts according to the search value
 * @param {array} contacts - Array of io.cozy.contact documents
 * @param {string} searchValue - Value of search input
 * @returns {array} Array of io.cozy.contact documents
 */
export const filterContactsBySearch = (contacts, searchValue) => {
  if (searchValue.length === 0) return contacts

  if (flag('search-threshold')) {
    fuse.options.threshold = flag.store.get('search-threshold')
    console.info('fuse threshold :', fuse.options.threshold)
  }

  fuse.setCollection(contacts)
  const fuseResults = fuse.search(searchValue)
  return fuseResults.map(result => result.item)
}

const setThreshold = value => {
  if (!isNaN(value)) {
    console.info('changing fuse threshold to', value)
    console.info('please change the search value')
    flag.store.set('search-threshold', value)
  }
}

export const delayedSetThreshold = debounce(
  thresholdValue => setThreshold(thresholdValue),
  375
)
