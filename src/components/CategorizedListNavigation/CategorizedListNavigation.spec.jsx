import AppLike from '../../tests/Applike'
import { mount } from 'enzyme'
import React from 'react'
import CategorizedListNavigation from './CategorizedListNavigation'

describe('CategorizedListNavigation', () => {
  it("should render a navigation button 'empty', corresponding to given contact without index", () => {
    expect.assertions(2)

    const givenContacts = [
      { _id: '012', name: { familyName: 'Doe', givenName: 'John' } }
    ]
    const CategorizedListNavigationInstance = (
      <AppLike>
        <CategorizedListNavigation contacts={givenContacts} />
      </AppLike>
    )
    const wrapper = mount(CategorizedListNavigationInstance)

    const navigationButtons = wrapper.find('ForwardRef(Button)')
    expect(navigationButtons.getElements().length).toEqual(1)
    expect(navigationButtons.text()).toBe('EMPTY')
  })

  it('should render navigation buttons corresponding to given contacts with index', () => {
    const givenContacts = [
      {
        _id: '012',
        name: { familyName: 'Doe', givenName: 'John' },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'D'
        }
      },
      {
        _id: '013',
        name: { familyName: 'Snow', givenName: 'John' },
        indexes: {
          byFamilyNameGivenNameEmailCozyUrl: 'S'
        }
      }
    ]

    const CategorizedListNavigationInstance = (
      <AppLike>
        <CategorizedListNavigation contacts={givenContacts} />
      </AppLike>
    )
    const wrapper = mount(CategorizedListNavigationInstance)

    const navigationButtons = wrapper.find('ForwardRef(Button)')
    const elements = navigationButtons.getElements()
    expect(elements.length).toEqual(2)
    expect(elements[0].props.children).toBe('D')
    expect(elements[1].props.children).toBe('S')
  })
})
