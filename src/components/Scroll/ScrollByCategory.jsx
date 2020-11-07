import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'

const ScrollByCategory = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleSelectedCategory = category => () => {
    setSelectedCategory(category)
    const target = document.querySelector(`#cat-${category}`)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-by-category">
      <span className="label">{t('scroll-by-category')}</span>
      {Object.keys(categorizedContacts).map(category => (
        <a
          key={category}
          className={classNames('item', {
            item__selected: category === selectedCategory
          })}
          onClick={handleSelectedCategory(category)}
        >
          {category.toUpperCase()}
        </a>
      ))}
    </div>
  )
}

ScrollByCategory.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ScrollByCategory
