import debounce from 'lodash/debounce'
import Fuse from 'fuse.js'
import { config } from '../constants/search'
import flag from 'cozy-flags'

const fuseOptions = {
  findAllMatches: true,
  threshold: 0.3,
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
  if (searchValue.length <= config.MIN_SEARCH_TRESHOLD) return contacts

  if (flag('search-threshold')) {
    fuse.options.threshold = flag.store.get('search-threshold')
    console.info('fuse threshold :', fuse.options.threshold) //eslint-disable-line no-console
  }

  fuse.setCollection(contacts)
  const fuseResults = fuse.search(searchValue)
  return fuseResults.map(result => result.item)
}

const setThreshold = value => {
  if (!isNaN(value)) {
    console.info('changing fuse threshold to', value) //eslint-disable-line no-console
    console.info('please change the search value') //eslint-disable-line no-console
    flag.store.set('search-threshold', value)
  }
}

export const delayedSetThreshold = debounce(
  thresholdValue => setThreshold(thresholdValue),
  375
)

/**
 * Scroll to corresponding section when one letter is entered
 * @param {string} searchValue - Value of search input
 * @param {object} ref - React ref object
 * @returns {void}
 */
export const scrollToSection = (searchValue, ref) =>
  ref &&
  Array.isArray(searchValue.split()) &&
  searchValue.length === config.MIN_SECTION_TRESHOLD &&
  ref.current.scrollIntoView({
    behavior: config.SCROLL_BEHAVIOR,
    inline: config.SCROLL_ALIGNMENT
  })

/**
 * Check if section corresponds to input first letter and returns ref if so
 * @param {string} searchValue - Value of search input
 * @param {object} ref - React ref object
 * @param {string} header - Section letter
 * @returns {boolean}
 */
export const applyRefIfCurrentSection = (searchValue, header, ref) =>
  searchValue && header && searchValue[0].toLowerCase() === header.toLowerCase()
    ? { ref }
    : {}
