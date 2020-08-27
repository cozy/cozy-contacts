import { useQuery } from 'cozy-client'

/**
 * Hook to fetch contacts according to a query.
 * FetchMore is triggered as many as necessary to get all contacts
 * @param {object} query - Definition created with Q()
 * @returns {array} Query's status {bool} and contacts {array}
 */
const useFetchContacts = query => {
  const { data, fetchStatus, hasMore, fetchMore } = useQuery(
    query.definition,
    query.options
  )
  const isFetchFinished = fetchStatus === 'loaded' && !hasMore

  if (fetchStatus === 'loaded' && hasMore) {
    fetchMore()
  }

  return [isFetchFinished, data]
}

export default useFetchContacts
