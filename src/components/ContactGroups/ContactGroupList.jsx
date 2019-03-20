import React from 'react'
import PropTypes from 'prop-types'

export class ContactGroupsList extends React.Component {
  render() {
    const { contact, allGroups, title } = this.props
    const userGroups = contact.groups.data
      .filter(group => group)
      .map(userGroup => allGroups.find(group => group._id === userGroup._id))
      .filter(value => value)

    return (
      <div className="u-mb-2">
        {title && <h3 className="u-title-h2 u-mt-1-half u-mb-1">{title}</h3>}
        <ol className="u-nolist u-m-0 u-p-0">
          {userGroups.map(group => (
            <li
              key={group._id}
              className="u-dib u-slateGrey u-fz-small u-p-half u-mr-half u-w-auto u-maw-4 u-bg-paleGrey u-ellipsis"
            >
              {group.name}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

ContactGroupsList.propTypes = {
  contact: PropTypes.object.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContactGroupsList
