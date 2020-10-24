import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ScrollToCategoryContext from '../Contexts/ScrollToCategory'

const ContactHeaderRow = ({ header }) => {
  const { isScrolling } = useContext(ScrollToCategoryContext)

  return (
    <div className={classNames('divider', { divider__relative: isScrolling })}>
      {header}
    </div>
  )
}

ContactHeaderRow.propTypes = {
  header: PropTypes.string.isRequired
}
export default ContactHeaderRow
