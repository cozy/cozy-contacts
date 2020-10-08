import React from 'react'
import { render, fireEvent } from '@testing-library/react'

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

describe('ContentResult', () => {
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
    fireEvent.click(getByText(enLocale.filter['all-contacts']))
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
    fireEvent.click(getByText(enLocale.filter['all-contacts']))
    fireEvent.click(getByText(groups[0].name))

    // should return an empty contact list
    expect(getByText(enLocale.importation.available_soon))
  })

  it('should show empty message in group filter if no group to filter on', () => {
    const { root } = setup({ allGroups: [] })

    const { getByText, getAllByText } = root

    // open the group filter
    fireEvent.click(getByText(enLocale.filter['all-contacts']))

    // should be all-contacts only once, and show the empty groups message
    expect(getAllByText(enLocale.filter['all-contacts']).length).toBe(1)
    expect(getByText(enLocale.filter['no-group']))
  })

  it('should show correct entry after selecting an option', () => {
    const { root } = setup()

    const { getByText, getByTestId } = root

    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      enLocale.filter['all-contacts']
    )

    // open the group filter and select first group
    fireEvent.click(getByText(enLocale.filter['all-contacts']))
    fireEvent.click(getByText(groups[0].name))

    // should show group name instead of default option
    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      groups[0].name
    )

    // should show default option again after selecting it
    fireEvent.click(getByText(enLocale.filter['all-contacts']))
    expect(getByTestId('selectBox-controlDefault').textContent).toBe(
      enLocale.filter['all-contacts']
    )
  })
})
