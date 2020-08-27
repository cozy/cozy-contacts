import { useState } from 'react'

import useFetchContacts from './useFetchContacts'
import { harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl } from '../../helpers/contacts'
import {
  contactsByFamilyNameGivenNameEmailCozyUrl,
  contactsWithoutIndexes
} from '../../helpers/queries'

/**
 * Fetches and harmonize contacts
 * @param {bool} hasServiceBeenLaunched - keepIndexFullNameAndDisplayNameUpToDate service launch status
 * @returns {array} [hasContactsToShow, contacts]
 */
const fetchSortedContacts = hasServiceBeenLaunched => {
  const [isContactsWithIndexesFinished, contactsWithIndexes] = useFetchContacts(
    contactsByFamilyNameGivenNameEmailCozyUrl
  )
  const [
    isContactsWithNoIndexesFinished,
    contactsWithNoIndexes
  ] = useFetchContacts(contactsWithoutIndexes)

  const [hasAlreadySortedContacts, setHasAlreadySortedContacts] = useState(
    false
  )
  const [sortedContacts, setSortedContacts] = useState([])

  const fetchesAreFinished =
    isContactsWithIndexesFinished && isContactsWithNoIndexesFinished

  if (fetchesAreFinished && !hasAlreadySortedContacts) {
    // hasServiceBeenLaunched will be deprecated when
    // all instances have been migrated.
    // Therefore, the false condition will no longer be needed and can be removed.
    const reworkedContacts = hasServiceBeenLaunched
      ? contactsWithIndexes.concat(contactsWithNoIndexes)
      : harmonizeAndSortByFamilyNameGivenNameEmailCozyUrl(
          contactsWithIndexes,
          contactsWithNoIndexes
        )

    setHasAlreadySortedContacts(true)
    setSortedContacts(reworkedContacts)
  }

  return [fetchesAreFinished, sortedContacts]
}

export default fetchSortedContacts
