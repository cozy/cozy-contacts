import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { categorizeContacts } from '../../helpers/contactList'
import ScrollToCategoryContext from '../Contexts/ScrollToCategory'

const ScrollByCategory = ({ contacts }) => {
  const { t } = useI18n()
  const { isScrolling, setIsScrolling } = useContext(ScrollToCategoryContext)
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [lastClick, setLastClick] = useState(null)
  const handleSelectedCategory = category => () => {
    setSelectedCategory(category)
    setLastClick(Date.now())
  }

  useEffect(() => {
    if (selectedCategory) setIsScrolling(true)
  }, [selectedCategory, setIsScrolling, lastClick])

  useEffect(() => {
    let to
    if (isScrolling) {
      const dividers = document.querySelectorAll('.list-contact .divider')
      const matchedDivider = Array.from(dividers).find(
        d => d.textContent === selectedCategory
      )
      matchedDivider.scrollIntoView({ behavior: 'smooth' })
      to = setTimeout(() => {
        setIsScrolling(false)
      }, 300)
    }
    const cleanup = () => clearTimeout(to)
    return cleanup
  }, [isScrolling, selectedCategory, setIsScrolling])

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
