/**
 * Select all contacts
 *
 * @param {Object} options
 * @param {Array} options.contactsDisplayed - Array of contacts displayed
 * @param {Array} options.selection - Array of selected contacts
 * @param {Function} options.selectAll - Function to select all contacts
 * @returns {Object} - Object with action
 */
export const selectAll = ({ contactsDisplayed, selection, selectAll }) => {
  return {
    name: 'select_all_action',
    icon: 'select-all',
    action: () => {
      const isAllContactsSelected =
        contactsDisplayed.length === selection.length

      !isAllContactsSelected ? selectAll(contactsDisplayed) : null
    }
  }
}
