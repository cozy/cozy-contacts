import { render, screen } from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

import ContactListItem, { hasDocBeenUpdated } from './ContactListItem'
import AppLike from '../../tests/Applike'

describe('ContactListItem', () => {
  it('should accept the strict minimum', () => {
    const contact = { email: [{ address: 'johndoe@localhost' }] }
    const contactListItemInstance = (
      <AppLike>
        <ContactListItem contact={contact} />
      </AppLike>
    )
    render(contactListItemInstance)
    const contactListItemEmail = screen.queryByTestId('ContactEmail')
    expect(contactListItemEmail).not.toBeNull()
    expect(contactListItemEmail.textContent).toBe(contact.email[0].address)
  })

  it('should display data', () => {
    const contact = {
      name: { familyName: 'Doe', givenName: 'John' },
      phone: [{ number: '0123456789' }],
      email: [{ address: 'johndoe@localhost' }],
      cozy: [{ url: 'http://johndoe.mycozy.cloud' }]
    }
    const ContactListItemInstance = (
      <AppLike>
        <ContactListItem contact={contact} />
      </AppLike>
    )
    render(ContactListItemInstance)
    const contactListItemName = screen.queryByTestId('ContactName')
    expect(contactListItemName).not.toBeNull()
    expect(contactListItemName.textContent).toEqual(
      expect.stringContaining(contact.name.givenName)
    )
    expect(contactListItemName.textContent).toEqual(
      expect.stringContaining(contact.name.familyName)
    )
    const contactListItemPhone = screen.queryByTestId('ContactPhone')
    expect(contactListItemPhone).not.toBeNull()
    expect(contactListItemPhone.textContent).toBe(contact.phone[0].number)

    const contactListItemCozyurl = screen.queryByTestId('ContactCozy')
    expect(contactListItemCozyurl).not.toBeNull()
    expect(contactListItemCozyurl.textContent).toBe(contact.cozy[0].url)
  })

  it('should display default value for missing information', () => {
    const contact = {}
    const ContactListItemInstance = (
      <AppLike>
        <ContactListItem contact={contact} />
      </AppLike>
    )
    render(ContactListItemInstance)
    const contactListItemName = screen.queryByTestId('ContactName')
    expect(contactListItemName).not.toBeNull()
    expect(contactListItemName.textContent.trim()).toBe('')
    const contactListItemPhone = screen.queryByTestId('ContactPhone')
    expect(contactListItemPhone).not.toBeNull()
    expect(contactListItemPhone.textContent.trim()).toBe('—')
    const contactListItemCozyurl = screen.queryByTestId('ContactCozy')
    expect(contactListItemCozyurl).not.toBeNull()
    expect(contactListItemCozyurl.textContent.trim()).toBe('—')
  })

  it('should accept empty array', () => {
    const contact = { email: [] }
    const ContactListItemInstance = (
      <AppLike>
        <ContactListItem contact={contact} />
      </AppLike>
    )
    render(ContactListItemInstance)
    const contactListItemEmail = screen.queryByTestId('ContactEmail')
    expect(contactListItemEmail).not.toBeNull()
    expect(contactListItemEmail.textContent).toBe('—')
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
          <ContactListItem contact={contact} />
        </AppLike>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('hasDocBeenUpdated', () => {
  it('should return false if nothing changed', () => {
    const document = {
      contact: {
        name: { familyName: 'Doe', givenName: 'John' },
        _rev: '001',
        cozyMetadata: { updatedAt: '2020' }
      }
    }
    const nextDocument = {
      contact: {
        name: { familyName: 'Doe', givenName: 'John' },
        _rev: '001',
        cozyMetadata: { updatedAt: '2020' }
      }
    }
    const isUpdated = hasDocBeenUpdated(document, nextDocument)
    expect(isUpdated).toBe(false)
  })

  it('should return true if document rev changed', () => {
    const document = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001',
      cozyMetadata: { updatedAt: '2020' }
    }
    const nextDocument = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '002',
      cozyMetadata: { updatedAt: '2020' }
    }
    const isUpdated = hasDocBeenUpdated(document, nextDocument)
    expect(isUpdated).toBe(true)
  })

  it('should return true if document updatedAt changed', () => {
    const document = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001',
      cozyMetadata: { updatedAt: '2019' }
    }
    const nextDocument = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001',
      cozyMetadata: { updatedAt: '2020' }
    }
    const isUpdated = hasDocBeenUpdated(document, nextDocument)
    expect(isUpdated).toBe(true)
  })

  it('should return true if document updatedAt and rev changed', () => {
    const document = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001',
      cozyMetadata: { updatedAt: '2019' }
    }
    const nextDocument = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '002',
      cozyMetadata: { updatedAt: '2020' }
    }
    const isUpdated = hasDocBeenUpdated(document, nextDocument)
    expect(isUpdated).toBe(true)
  })

  it('should return true if document cozyMetadata is missing', () => {
    const document = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001'
    }
    const nextDocument = {
      name: { familyName: 'Doe', givenName: 'John' },
      _rev: '001',
      cozyMetadata: { updatedAt: '2020' }
    }
    const isUpdated = hasDocBeenUpdated(document, nextDocument)
    expect(isUpdated).toBe(true)
  })
})
