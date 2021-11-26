import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import AppLike from '../tests/Applike'
import ContentResult from './ContentResult'
import { groups, contactWithGroup, johnDoeContact } from '../helpers/testData'
import enLocale from '../locales/en.json'

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration))

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
    const { root } = setup({
      contacts: [mockedContacts.withoutGroup[0], mockedContacts.withGroup[0]]
    })

    const contactWithGroup = mockedContacts.withGroup[0].name.familyName
    const contactWithoutGroup = mockedContacts.withoutGroup[0].name.familyName

    const { getByText, queryByText } = root

    // contacts with and without group should be present
    expect(getByText(contactWithGroup))
    expect(getByText(contactWithoutGroup))

    // open the group filter and select first group
    fireEvent.click(getByText(enLocale.filter['all-groups']))
    fireEvent.click(getByText(groups[0].name))

    // should not return an empty contact list
    expect(queryByText(enLocale.importation.available_soon)).toBeNull()

    // contacts without group should not be present
    expect(getByText(contactWithGroup))
    expect(queryByText(contactWithoutGroup)).toBeNull()
  })

  it('should show empty list after filtering contacts with no group', () => {
    const { root } = setup()

    const { getByText } = root

    // open the group filter and select first group
    fireEvent.click(getByText(enLocale.filter['all-groups']))
    fireEvent.click(getByText(groups[0].name))

    // should return an empty contact list
    expect(getByText(enLocale.importation.available_soon))
  })

  it('should show empty message in group filter if no group to filter on', () => {
    const { root } = setup({ allGroups: [] })

    const { getByText, getAllByText } = root

    // open the group filter
    fireEvent.click(getByText(enLocale.filter['all-groups']))

    // should be all-groups only once, and show the empty groups message
    expect(getAllByText(enLocale.filter['all-groups']).length).toBe(1)
    expect(getByText(enLocale.filter['no-group']))
  })

  it('should show correct entry after selecting an option', () => {
    const { root } = setup()

    const { queryByText, getByText, getByTestId } = root

    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      enLocale.filter['all-groups']
    )

    // open the group filter and select first group
    fireEvent.click(getByText(enLocale.filter['all-groups']))
    fireEvent.click(getByText(groups[0].name))

    // should close the menu after selecting an option
    expect(queryByText(groups[1].name)).toBeNull()

    // should show group name instead of default option
    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      groups[0].name
    )

    // should show default option again after selecting it
    fireEvent.click(getByTestId('selectBox-controlDefault'))
    fireEvent.click(getByText(enLocale.filter['all-groups']))
    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      enLocale.filter['all-groups']
    )
  })
})

describe('ContentResult - search', () => {
  // put search value and awaits the search completion
  const search = async (searchValue, getByPlaceholderText) => {
    const searchInput = getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: searchValue } })
    await act(async () => {
      await sleep(1000)
    })
  }

  it('should not show any category when using search input', async () => {
    const { root } = setup()
    const searchValue = 'John'

    const { queryByText, getAllByText, getByPlaceholderText } = root

    // category of the contact + shortcuts by letter on the right
    expect(getAllByText('EMPTY')).toBeTruthy()

    await search(searchValue, getByPlaceholderText)

    expect(queryByText('EMPTY')).toBeNull()
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
    const { root } = setup({ contacts })

    const { getAllByTestId, getByPlaceholderText } = root

    await search(searchValue, getByPlaceholderText)

    const contactListItems = getAllByTestId('contact-listItem')

    expect(contactListItems.length).toBe(2)
    expect(contactListItems[0].textContent).toMatch('John')
    expect(contactListItems[1].textContent).toMatch('Matt')
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
    const { root } = setup({ contacts })

    const { getByText, queryByText, getByPlaceholderText } = root

    // open the group filter and select the first group
    fireEvent.click(getByText(enLocale.filter['all-groups']))
    fireEvent.click(getByText(groups[0].name))

    await search(searchValue, getByPlaceholderText)

    expect(getByText('John')).toBeTruthy()
    expect(queryByText('Matt')).toBeNull()
    expect(queryByText('Jane')).toBeNull()
  })
})
