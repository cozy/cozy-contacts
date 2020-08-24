import React from 'react'
import { mount } from 'enzyme'

import AppLike from '../../tests/Applike'

import ContactRow from './ContactRow'
import renderer from 'react-test-renderer'
describe('ContactRow', () => {
  it('should accept the strict minimum', () => {
    const contact = { email: [{ address: 'johndoe@localhost' }] }
    const contactRowInstance = (
      <AppLike>
        <ContactRow contact={contact} />
      </AppLike>
    )
    const contactrow = mount(contactRowInstance)
    const contactrowemail = contactrow.find('ContactEmail')
    expect(contactrowemail).toBeDefined()
    expect(contactrowemail.text()).toBe(contact.email[0].address)
  })

  it('should display data', () => {
    const contact = {
      name: { familyName: 'Doe', givenName: 'John' },
      phone: [{ number: '0123456789' }],
      email: [{ address: 'johndoe@localhost' }],
      cozy: [{ url: 'http://johndoe.mycozy.cloud' }]
    }
    const contactRowInstance = (
      <AppLike>
        <ContactRow contact={contact} />
      </AppLike>
    )
    const contactrow = mount(contactRowInstance)
    const contactrowname = contactrow.find('ContactName')
    expect(contactrowname).toBeDefined()
    expect(contactrowname.text()).toEqual(
      expect.stringContaining(contact.name.givenName)
    )
    expect(contactrowname.text()).toEqual(
      expect.stringContaining(contact.name.familyName)
    )
    const contactrowphone = contactrow.find('ContactPhone')
    expect(contactrowphone).toBeDefined()
    expect(contactrowphone.text()).toBe(contact.phone[0].number)

    const contactrowcozyurl = contactrow.find('ContactCozy')
    expect(contactrowcozyurl).toBeDefined()
    expect(contactrowcozyurl.text()).toBe(contact.cozy[0].url)
  })

  it('should display default value for missing information', () => {
    const contact = {}
    const contactRowInstance = (
      <AppLike>
        <ContactRow contact={contact} />
      </AppLike>
    )
    const contactrow = mount(contactRowInstance)
    const contactrowname = contactrow.find('ContactName')
    expect(contactrowname).toBeDefined()
    expect(contactrowname.text().trim()).toBe('')
    const contactrowphone = contactrow.find('ContactPhone')
    expect(contactrowphone).toBeDefined()
    expect(contactrowphone.text().trim()).toBe('—')
    const contactrowcozyurl = contactrow.find('ContactCozy')
    expect(contactrowcozyurl).toBeDefined()
    expect(contactrowcozyurl.text().trim()).toBe('—')
  })

  it('should accept empty array', () => {
    const contact = { email: [] }
    const contactRowInstance = (
      <AppLike>
        <ContactRow contact={contact} />
      </AppLike>
    )
    const contactrow = mount(contactRowInstance)
    const contactrowemail = contactrow.find('ContactEmail')
    expect(contactrowemail).toBeDefined()
    expect(contactrowemail.text()).toBe('—')
  })

  it('should match the contact snapshot', () => {
    const contact = {
      name: { familyName: 'Doe', givenName: 'John' },
      phone: [{ number: '0123456789' }],
      email: [{ address: 'johndoe@localhost' }],
      cozy: [{ url: 'http://johndoe.mycozy.cloud' }]
    }
    const tree = renderer
      .create(
        <AppLike>
          <ContactRow contact={contact} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
