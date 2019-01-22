import React from 'react'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'

import ContactsListDataLoader from './ContactsListDataLoader'
import renderer from 'react-test-renderer'
describe('ContactsListOrSpinner', () => {
  test('should display the loader', () => {
    const contact = { email: [{ address: 'johndoe@localhost' }] }
    const contactRowInstance = (
      <AppLike>
        <ContactsListDataLoader
          contacts={[contact]}
          hasMore={false}
          fetchStatus={'loading'}
          fetchMore={() => {}}
        />
      </AppLike>
    )
    const tree = renderer.create(contactRowInstance).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should display the contact List', () => {
    const contact = { email: [{ address: 'johndoe@localhost' }] }
    const contactRowInstance = (
      <AppLike>
        <ContactsListDataLoader
          contacts={[contact]}
          hasMore={false}
          fetchStatus={'loaded'}
          fetchMore={() => {}}
        />
      </AppLike>
    )
    const tree = renderer.create(contactRowInstance).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should call fetchMore only when needed', () => {
    const contact = { email: [{ address: 'johndoe@localhost' }] }
    const fetchMore = jest.fn()

    const contactRowInstance = (
      <AppLike>
        <ContactsListDataLoader
          contacts={[contact]}
          hasMore={true}
          fetchStatus={'loaded'}
          fetchMore={fetchMore}
        />
      </AppLike>
    )
    const comp = mount(contactRowInstance)
    expect(fetchMore).not.toBeCalled()
    comp.setProps({ contacts: [] })
    expect(fetchMore).toBeCalled()
    comp.setProps({ hasMore: false })
    expect(fetchMore).toBeCalled()
  })
})
