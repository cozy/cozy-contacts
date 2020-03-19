import React from 'react'

import AppLike from '../../tests/Applike'
import ContactsFilters from './ContactsFilters'
import renderer from 'react-test-renderer'

describe('ContactsFilters', () => {
  const allGroups = [
    { id: 'group_id_family', name: 'Family' },
    { id: 'group_id_work', name: 'Work' }
  ]
  const defaultFilter = 'all'

  it('should display the filters with default filter selected', () => {
    const instance = (
      <AppLike>
        <ContactsFilters
          allGroups={allGroups}
          filter={defaultFilter}
          defaultFilter={defaultFilter}
          setFilter={() => {}}
        />
      </AppLike>
    )
    const tree = renderer.create(instance).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display the filters with "Family" selected', () => {
    const instance = (
      <AppLike>
        <ContactsFilters
          allGroups={allGroups}
          filter={allGroups[0].id}
          defaultFilter={defaultFilter}
          setFilter={() => {}}
        />
      </AppLike>
    )
    const tree = renderer.create(instance).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display the filters with "Work" selected', () => {
    const instance = (
      <AppLike>
        <ContactsFilters
          allGroups={allGroups}
          filter={allGroups[1].id}
          defaultFilter={defaultFilter}
          setFilter={() => {}}
        />
      </AppLike>
    )
    const tree = renderer.create(instance).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
