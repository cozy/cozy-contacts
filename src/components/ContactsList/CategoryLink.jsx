import React from 'react'
import PropTypes from 'prop-types'
import CategoryLinkItem from './CategoryLinkItem'

const CategoryLink = ({ categories }) => {
  return (
    <div className="category-link">
      {categories.map(category => (
        <CategoryLinkItem key={`link-cat-${category}`} category={category} />
      ))}
    </div>
  )
}

CategoryLink.propTypes = {
  categories: PropTypes.array.isRequired
}

export default React.memo(CategoryLink)
