import { useEffect } from 'react'

/**
 * useKeyPress
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(action) {
  useEffect(() => {
    window.addEventListener('keypress', action)
    return () => window.removeEventListener('keypress', action)
  }, [action])
}
