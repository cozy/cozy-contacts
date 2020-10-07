import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'
import ContactsList, { getGroupId } from './ContactsList'

import { johnDoeContact } from '../../helpers/testData'

const fakeContactWithIndexes = {
  ...johnDoeContact,
  indexes: {
    byFamilyNameGivenNameEmailCozyUrl: 'john.doe@cozycloud.cc'
  }
}

const firstContactLetter = fakeContactWithIndexes.fullname[0].toLowerCase()

const fireKeyupEvent = key => {
  const keyupEvent = new KeyboardEvent('keyup', { key })
  document.dispatchEvent(keyupEvent)
}

let scrollIntoViewSpy

beforeAll(() => {
  scrollIntoViewSpy = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewSpy
})

afterAll(() => {
  scrollIntoViewSpy.mockRestore()
})

describe('ContactsList', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(
        <AppLike>
          <ContactsList contacts={[fakeContactWithIndexes]} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should renders an empty state', () => {
    const contactsListInstance = (
      <AppLike>
        <ContactsList contacts={[]} />
      </AppLike>
    )
    const contactslist = mount(contactsListInstance)
    const contactsemptylist = contactslist.find('ContactsEmptyList')
    expect(contactsemptylist).toBeDefined()
  })

  it('scrolls to the group on keyup', () => {
    const contactsListInstance = (
      <AppLike>
        <ContactsList contacts={[fakeContactWithIndexes]} />
      </AppLike>
    )
    const contactslist = mount(contactsListInstance)
    const group = contactslist.find(`.${getGroupId(firstContactLetter)}`)
    const groupInstance = group.instance()

    // renders a group
    expect(groupInstance).toBeDefined()

    fireKeyupEvent(firstContactLetter)

    // test (smooth) scrolling
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1)
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  // it('does not scroll when a modal is open', () => {
  //   const contactsListInstance = (
  //     <AppLike>
  //       <ContactsList contacts={[fakeContactWithIndexes]} show />
  //     </AppLike>
  //   )

  //   mount(contactsListInstance)
  //   fireKeyupEvent(firstContactLetter)
  //   expect(scrollIntoViewSpy).toHaveBeenCalledTimes(0)
  // })
})
