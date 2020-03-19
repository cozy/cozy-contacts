import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Button } from 'cozy-ui/transpiled/react'

class ContactsFilters extends Component {
  render() {
    const { setFilter, filter, allGroups, defaultFilter } = this.props

    return (
      <div className="filters-wrapper">
        <div>Sort by group : </div>
        {allGroups.map(group => (
          <Button
            key={group.id}
            label={group.name}
            theme={filter === group.id ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setFilter(group.id)}
          />
        ))}
        <Button
          label="All"
          size="small"
          theme={filter === defaultFilter ? 'primary' : 'secondary'}
          onClick={() => setFilter(defaultFilter)}
        />
      </div>
    )
  }
}

ContactsFilters.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  allGroups: PropTypes.array.isRequired,
  defaultFilter: PropTypes.string.isRequired
}

export default ContactsFilters
