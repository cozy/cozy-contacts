import React from 'react'
import PropTypes from 'prop-types'

const getScrollToLink = (label, ref) => {
  const scrollTo = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <li key={`header-nav-${label}`}>
      <a onClick={scrollTo}>{label.toUpperCase()}</a>
    </li>
  )
}

/**
 * A component displaying a list of links. When a link is clicked, the browser scrolls to the appropriate referenced content
 * @param headersWithRef: an array containing pairs of [header, ref]
 * where header is the label displayed for the link and ref is a React reference to scroll to.
 * All the labels are capitalized
 */
const HeaderNavigator = ({ headersWithRef }) => {
  return (
    <ol className="header-navigator">
      {headersWithRef.map(([header, ref]) => getScrollToLink(header, ref))}
    </ol>
  )
}

HeaderNavigator.propTypes = {
  headersWithRef: PropTypes.array.isRequired
}

export default HeaderNavigator
