import React from 'react'
import PropTypes from 'prop-types'

import { fullContactPropTypes } from '../ContactPropTypes'
import FieldsetTitle from '../Common/FieldsetTitle'
import GroupItem from '../Common/GroupItem'

export const ContactGroupsList = ({ contact, allGroups, title }) => {
  const userGroups = contact.groups.data
    .filter(group => group)
    .map(userGroup => allGroups.find(group => group._id === userGroup._id))
    .filter(value => value)
  if (userGroups.length === 0) return null
  return (
    <div className="u-mb-2">
      {title && <FieldsetTitle title={title} />}
      <ol className="u-nolist u-m-0 u-p-0">
        {userGroups.map(group => (
          <GroupItem key={group._id}>{group.name}</GroupItem>
        ))}
      </ol>
    </div>
  )
}

ContactGroupsList.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  title: PropTypes.string
}

export default ContactGroupsList
