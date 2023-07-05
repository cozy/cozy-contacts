/**
 * Make object of actions for SelectionBar component
 *
 * @param {Array} actions - Array of actions
 * @param {Object} options - Options for actions
 * @returns {Object} - Object with actions
 */
export const makeActions = (actions = [], options = {}) => {
  return actions.reduce((acc, action) => {
    const actionMenu = action(options)
    const name = actionMenu.name || action.name

    return { ...acc, [name]: actionMenu }
  }, {})
}
