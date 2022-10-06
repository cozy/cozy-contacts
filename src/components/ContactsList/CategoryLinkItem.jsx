import React from 'react'
import PropTypes from 'prop-types'

import Chips from 'cozy-ui/transpiled/react/Chips'

const CategoryLinkItem = ({ category }) => {
  const scrollTo = e => {
    e.preventDefault() // Stop Page Reloading
    let categoryElement = document.getElementById(`cat-${category}`)
    categoryElement &&
      categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Chips
      sx={{ margin: '10px' }}
      label={category.toUpperCase()}
      onClick={scrollTo}
    />
  )
}

CategoryLinkItem.propTypes = {
  category: PropTypes.string.isRequired
}

export default React.memo(CategoryLinkItem)
