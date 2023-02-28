import React from 'react'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'

import AppLike from '../tests/Applike'
import ContentResult from './ContentResult'
import { groups, contactWithGroup, johnDoeContact } from '../helpers/testData'
import enLocale from '../locales/en.json'

const mockedContacts = {
  withoutGroup: [johnDoeContact],
  withGroup: [contactWithGroup]
}

const setup = ({
  contacts = mockedContacts.withoutGroup,
  allGroups = groups
} = {}) => {
  const root = render(
    <AppLike>
      <ContentResult contacts={contacts} allGroups={allGroups} />
    </AppLike>
  )
  return { root }
}

describe('ContentResult - groups', () => {
  it('should show only filtered contacts after selecting a group filter', () => {
    setup({
      contacts: [mockedContacts.withoutGroup[0], mockedContacts.withGroup[0]]
    })

    const contactWithGroup = mockedContacts.withGroup[0].name.familyName
    const contactWithoutGroup = mockedContacts.withoutGroup[0].name.familyName

    // contacts with and without group should be present
    expect(screen.queryByText(contactWithGroup)).not.toBeNull()
    expect(screen.queryByText(contactWithoutGroup)).not.toBeNull()

    act(() => {
      // open the group filter and select first group
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    act(() => {
      fireEvent.click(screen.getByText(groups[0].name))
    })

    // should not return an empty contact list
    expect(screen.queryByText(enLocale.importation.available_soon)).toBeNull()

    // contacts without group should not be present
    expect(screen.queryByText(contactWithGroup)).not.toBeNull()
    expect(screen.queryByText(contactWithoutGroup)).toBeNull()
  })

  it('should show empty list after filtering contacts with no group', () => {
    setup()

    act(() => {
      // open the group filter and select first group
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    act(() => {
      fireEvent.click(screen.getByText(groups[0].name))
    })

    // should return an empty contact list
    expect(
      screen.queryByText(enLocale.importation.available_soon)
    ).not.toBeNull()
  })

  it('should show empty message in group filter if no group to filter on', () => {
    setup({ allGroups: [] })

    act(() => {
      // open the group filter
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    // should be all-groups only once, and show the empty groups message
    expect(screen.queryByText(enLocale.filter['all-groups'])).not.toBeNull()
    expect(screen.queryByText(enLocale.filter['no-group'])).not.toBeNull()
  })

  it('should show correct entry after selecting an option', () => {
    setup()

    let selectBox = screen.queryByTestId('selectBox-controlDefault')
    expect(selectBox).not.toBeNull()
    expect(selectBox.textContent).toBe(enLocale.filter['all-groups'])

    act(() => {
      // open the group filter and select first group
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    act(() => {
      fireEvent.click(screen.getByText(groups[0].name))
    })

    // should close the menu after selecting an option
    expect(screen.queryByText(groups[1].name)).toBeNull()

    // should show group name instead of default option
    selectBox = screen.queryByTestId('selectBox-controlDefault')
    expect(selectBox).not.toBeNull()
    expect(selectBox.textContent).toBe(groups[0].name)

    act(() => {
      // should show default option again after selecting it
      fireEvent.click(screen.getByTestId('selectBox-controlDefault'))
    })

    act(() => {
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    selectBox = screen.queryByTestId('selectBox-controlDefault')
    expect(selectBox).not.toBeNull()
    expect(selectBox.textContent).toBe(enLocale.filter['all-groups'])
  })
})

describe('ContentResult - search', () => {
  // put search value and awaits the search completion
  const search = searchValue => {
    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: searchValue }
    })
  }

  it('should not show any category when using search input', async () => {
    setup()
    const searchValue = 'John'

    // category of the contact
    expect(screen.queryByText('EMPTY')).not.toBeNull()

    act(() => {
      search(searchValue)
    })

    await waitFor(() => {
      expect(screen.queryByText('EMPTY')).toBeNull()
    })
  })

  it('should show contacts in correct order when using search input', async () => {
    const contacts = [
      { _id: '01', name: { givenName: 'John', familyName: 'Connor' } },
      {
        _id: '02',
        name: { givenName: 'Matt', familyName: 'Damon' },
        note: 'friend of John'
      },
      {
        _id: '03',
        name: { givenName: 'Jane', familyName: 'Doe' }
      }
    ]
    const searchValue = 'John'
    setup({ contacts })

    act(() => {
      search(searchValue)
    })

    await waitFor(() => {
      const contactListItems = screen.queryAllByTestId('contact-listItem')
      expect(contactListItems.length).toBe(2)
      expect(contactListItems[0].textContent).toMatch('John')
      expect(contactListItems[1].textContent).toMatch('Matt')
    })
  })

  it('should sort contacts by groups and search', async () => {
    const contacts = [
      {
        _id: '01',
        name: { givenName: 'John', familyName: 'Doe' },
        relationships: { groups: { data: groups } }
      },
      {
        _id: '02',
        name: { givenName: 'Matt', familyName: 'Damon' }
      },
      {
        _id: '03',
        name: { givenName: 'Jane', familyName: 'Doe' }
      }
    ]
    const searchValue = 'Doe'
    setup({ contacts })

    act(() => {
      // open the group filter and select the first group
      fireEvent.click(screen.getByText(enLocale.filter['all-groups']))
    })

    act(() => {
      fireEvent.click(screen.getByText(groups[0].name))
    })

    act(() => {
      search(searchValue)
    })

    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeNull()
      expect(screen.queryByText('Matt')).toBeNull()
      expect(screen.queryByText('Jane')).toBeNull()
    })
  })
})
