import { useState, useCallback, useEffect } from 'react'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import log from 'cozy-logger'

import { fetchNormalizedServiceByName } from '../../helpers/fetches'

const useService = () => {
  const [serviceToLaunch, setServiceToLaunch] = useState(null)
  const [hasServiceBeenLaunched, setHasServiceBeenLaunched] = useState(null)
  const client = useClient()

  const setStateOfServiceToLaunch = useCallback(async () => {
    const serviceToLaunch = await fetchNormalizedServiceByName(
      client,
      'keepIndexFullNameAndDisplayNameUpToDate'
    )
    setServiceToLaunch(serviceToLaunch)
    setHasServiceBeenLaunched(
      get(serviceToLaunch, 'current_state.last_success', '').length > 0
    )
  }, [client])

  useEffect(() => {
    setStateOfServiceToLaunch()
  }, [setStateOfServiceToLaunch])

  // start keepIndexFullNameAndDisplayNameUpToDate service
  // if never launched before
  if (serviceToLaunch && hasServiceBeenLaunched === false) {
    log(
      'info',
      `Executing keepIndexFullNameAndDisplayNameUpToDate service by Contacts app`
    )
    client.collection('io.cozy.triggers').launch(serviceToLaunch)
  }

  return hasServiceBeenLaunched
}

export default useService
