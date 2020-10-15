import { useEffect } from 'react'
import flag from 'cozy-flags'

const flagsList = () => {
  flag('switcher', true)
  flag('logs')
  flag('select-all-contacts')
  flag('search-threshold')
}

const initFlags = () => {
  let activateFlags = flag('switcher') === true ? true : false
  if (process.env.NODE_ENV !== 'production' && flag('switcher') === null) {
    activateFlags = true
  }
  const searchParams = new URL(window.location).searchParams
  if (!activateFlags && searchParams.get('flags') !== null) {
    activateFlags = true
  }
  if (activateFlags) {
    flagsList()
  }
}

const useFlags = () => {
  useEffect(() => {
    initFlags()
  }, [])
}

export default useFlags
