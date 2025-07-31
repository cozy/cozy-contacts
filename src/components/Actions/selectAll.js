import SelectAllIcon from 'cozy-ui/transpiled/react/Icons/SelectAll'

/**
 * Select all contacts
 *
 * @param {Object} options
 * @param {Array} options.contactsDisplayed - Array of contacts displayed
 * @param {Array} options.selection - Array of selected contacts
 * @param {Function} options.selectAll - Function to select all contacts
 * @returns {Object} - Object with action
 */
export const selectAll = ({ contactsDisplayed, selectAll, isMobile, t }) => {
  const label = isMobile
    ? t('SelectionBar.select')
    : t('SelectionBar.select_all_action')
  const icon = SelectAllIcon

  return {
    name: 'selectAll',
    label,
    icon,
    action: docs => {
      const isAllContactsSelected = contactsDisplayed.length === docs.length

      !isAllContactsSelected ? selectAll(contactsDisplayed) : null
    }
  }
}
