import { useState } from 'react'
import { useQuery } from 'cozy-client'

/**
 * Hook to fetch contacts according to a query.
 * FetchMore is triggered as many as necessary to get all contacts
 * @param {object} query - Definition created with Q()
 * @returns {array} Query's status {bool} and contacts {array}
 */
const useFetchContacts = query => {
  const [isFetchFinished, setIsFetchFinished] = useState(false)
  const [contacts, setContacts] = useState([])
  const { data, fetchStatus, hasMore, fetchMore } = useQuery(
    query.definition,
    query.options
  )

  if (fetchStatus === 'loaded' && !hasMore) {
    if (isFetchFinished) return [isFetchFinished, contacts]
    setContacts(data)
    setIsFetchFinished(true)
  }

  if (fetchStatus === 'loaded' && hasMore) {
    fetchMore()
  }

  return [isFetchFinished, contacts]
}

export default useFetchContacts
