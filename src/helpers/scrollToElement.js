/**
 * Will scroll smoothly to the given element id.
 * @param {string} id DOM id of element to which we want to scroll to
 */
export const scrollToElement = id => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
