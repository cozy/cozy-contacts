import { useEffect } from 'react'
import { useMatch } from 'react-router-dom'

export const useIntentBackdrop = () => {
  const matchNew = useMatch('/new')
  const matchImport = useMatch('/import')
  const matchContact = useMatch('/:contactId')
  const matchContactEdit = useMatch('/:contactId/edit')
  const matchContactDelete = useMatch('/:contactId/delete')
  const matchGroupDelete = useMatch('/group/:groupId/delete/:groupName')
  const isMatching =
    !!matchNew ||
    !!matchImport ||
    !!matchContact ||
    !!matchContactEdit ||
    !!matchContactDelete ||
    !!matchGroupDelete

  useEffect(() => {
    if (isMatching) {
      window.parent.postMessage('requestBackdropOpen', '*')
    } else {
      window.parent.postMessage('requestBackdropClose', '*')
    }
  }, [isMatching])
}
