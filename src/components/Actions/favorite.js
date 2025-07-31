import minilog from 'cozy-minilog'
import StarIcon from 'cozy-ui/transpiled/react/Icons/Star'
import StarOutlineIcon from 'cozy-ui/transpiled/react/Icons/StarOutline'

import { mergeContact } from '../../helpers/mergeContact'

const log = minilog('connections/allContacts')

/**
 * Action to favorite a contact
 * @param  {object} options.client - CozyClient instance
 * @param  {array} options.selection - Array of selected contacts
 * @param  {object} options.t - Translation function
 */
export const favorite = ({
  client,
  selection,
  clearSelection,
  isMobile,
  t
}) => {
  const noFavoriteSelected = selection.filter(
    contact => !contact.cozyMetadata?.favorite
  )
  const isAllFavorite = noFavoriteSelected.length === 0
  const icon = isAllFavorite ? StarIcon : StarOutlineIcon
  const label = isMobile
    ? t('SelectionBar.favorites')
    : isAllFavorite
    ? t('SelectionBar.remove_favorite')
    : t('SelectionBar.add_favorite')

  return {
    name: 'favorite',
    label,
    icon,
    action: async docs => {
      const contactToUpdate = isAllFavorite ? docs : noFavoriteSelected
      const favorite = isAllFavorite ? false : true
      const contactsToSave = contactToUpdate.map(contact =>
        mergeContact(contact, {
          cozyMetadata: { favorite }
        })
      )

      try {
        await client.saveAll(contactsToSave)
      } catch (error) {
        log.error('Error updating contact', error)
      } finally {
        clearSelection()
      }
    }
  }
}
