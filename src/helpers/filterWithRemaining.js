/**
 * @typedef {object} FilterWithRemainingResponse
 * @property {Array} itemsFound - Array with the items that pass the test.
 * @property {Array} remainingItems - Array with the items that not pass the test.
 */

/**
 * Filter the elements of an array and return the found and remaining elements separately.
 *
 * @param {Array} array - The array with the items that must be tested.
 * @param {Function} fn - Function to execute on each value in the array.
 * The function is called with the following arguments:
 * - item: The current element in the array.
 * - index: The index (position) of the current element in the array.
 * @returns {FilterWithRemainingResponse} The items found and remaining.
 */
export const filterWithRemaining = (array, fn) => {
  const [itemsFound, remainingItems] = [[], []]

  array.forEach((currentItem, index) => {
    if (fn(currentItem, index)) itemsFound.push(currentItem)
    else remainingItems.push(currentItem)
  })

  return { itemsFound, remainingItems }
}
