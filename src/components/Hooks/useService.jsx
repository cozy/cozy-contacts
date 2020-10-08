import { useState, useCallback, useEffect } from 'react'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import log from 'cozy-logger'

import { fetchNormalizedServiceByName } from '../../helpers/fetches'

const hasServiceBeenLaunched = service => {
  return get(service, 'current_state.last_success', '').length > 0
}

const useService = name => {
  const [service, setService] = useState(null)
  const hasBeenLaunched = !!service && hasServiceBeenLaunched(service)
  const client = useClient()

  const fetchService = useCallback(async () => {
    const service = await fetchNormalizedServiceByName(client, name)
    setService(service)
  }, [client, name])

  useEffect(() => {
    fetchService()
  }, [fetchService])

  useEffect(() => {
    // start service if it has never been launched before
    if (service && hasBeenLaunched === false) {
      log('info', `Executing ${name} service by Contacts app`)
      client.collection('io.cozy.triggers').launch(service)
    }
  }, [service, client, hasBeenLaunched, name])

  return hasBeenLaunched
}

export default useService
