import React from 'react'
import Avatar from 'cozy-ui/transpiled/react/Avatar'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import { fullContactPropTypes } from '../ContactPropTypes'
import { models } from 'cozy-client'
const { getInitials, getFullname } = models.contact

const ContactIdentity = ({ contact, breakpoints: { isMobile } }) => {
  return (
    <div className="u-flex u-flex-items-center u-flex-column-s u-flex-justify-start-s u-ov-hidden u-maw-100 u-mr-1 u-mr-0-s">
      <Avatar
        text={getInitials(contact)}
        size={isMobile ? 'small' : 'medium'}
        className="u-mb-half-s u-flex-shrink-0"
      />
      <h1 className="u-title-h1 u-mv-0 u-mh-1 u-mb-half-s u-ellipsis u-spacellipsis-s u-maw-100 u-ta-center-s">
        {getFullname(contact)}
      </h1>
    </div>
  )
}

ContactIdentity.propTypes = {
  contact: fullContactPropTypes.isRequired
}

export default withBreakpoints()(ContactIdentity)
