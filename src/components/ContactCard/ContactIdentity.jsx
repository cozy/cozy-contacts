import React from 'react'
import cx from 'classnames'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import { fullContactPropTypes } from '../ContactPropTypes'
import { getFullContactName, getInitials } from '../../helpers/contacts'

const ContactIdentity = ({ contact, breakpoints: { isMobile } }) => {
  return (
    <div className="u-flex u-flex-items-center u-flex-column-s u-flex-justify-start-s">
      <Avatar
        text={getInitials(contact.name).toUpperCase()}
        size={isMobile ? 'small' : 'medium'}
        className="u-mb-half-s u-flex-shrink-0"
      />
      <h1
        className={cx('u-title-h1 u-mv-0 u-mh-1 u-mb-half-s', {
          'u-ta-center': isMobile
        })}
      >
        {getFullContactName(contact.name)}
      </h1>
    </div>
  )
}

ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired
}

export default withBreakpoints()(ContactIdentity)
