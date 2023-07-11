import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'

import { createMockClient } from 'cozy-client'

import ContactForm from './index'
import { johnDoeContact as contact } from '../../../helpers/testData'
import AppLike from '../../../tests/Applike'

const client = createMockClient({})
const setup = ({ contact }) => {
  return {
    contact,
    onSubmit: () => jest.fn(),
    onCancel: () => jest.fn()
  }
}

const labels = [
  'Firstname',
  'Lastname',
  'Phone',
  'Email',
  'Address',
  'Cozy URL',
  'Company',
  'Job title',
  'Birthday',
  'Notes'
]

describe('ContactForm', () => {
  it(`should contains ${labels.length} fields and labels`, () => {
    const props = setup({ contact: {} })
    const jsx = (
      <AppLike client={client}>
        <ContactForm {...props} />
      </AppLike>
    )
    render(jsx)
    for (const label of labels) {
      expect(screen.queryByLabelText(label)).not.toBeNull()
    }
  })

  it('should fill form with contact data', () => {
    const props = setup({ contact })
    const jsx = (
      <AppLike client={client}>
        <ContactForm {...props} />
      </AppLike>
    )
    render(jsx)
    expect(screen.queryByDisplayValue(contact.name.givenName)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.name.familyName)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.phone[0].number)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.email[0].address)).not.toBeNull()
    expect(
      screen.queryByDisplayValue(contact.address[0].formattedAddress)
    ).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.cozy[0].url)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.company)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.jobTitle)).not.toBeNull()
    expect(screen.queryByDisplayValue(contact.note)).not.toBeNull()
  })

  it('should submit a well formatted contact', () => {
    const expected = {
      address: [
        {
          city: undefined,
          code: undefined,
          country: undefined,
          formattedAddress: '18 rue des fleurs, Pecado',
          number: undefined,
          primary: true,
          street: '18 rue des fleurs, Pecado',
          type: undefined
        }
      ],
      birthday: '2015-12-31',
      birthplace: 'somewhere',
      gender: 'male',
      company: 'Cozy CLoud',
      cozy: [
        { label: undefined, primary: true, url: 'https://jcvd.cozy.cloud' }
      ],
      displayName: 'Jean-Claude Van Cozy',
      email: [{ address: 'jcvc@cozy.cloud', primary: true, type: undefined }],
      fullname: 'Jean-Claude Van Cozy',
      indexes: {
        byFamilyNameGivenNameEmailCozyUrl:
          'van cozyjean-claudejcvc@cozy.cloudjcvd.cozy.cloud'
      },
      jobTitle: 'Dreamer',
      metadata: { cozy: true, version: 1 },
      name: { familyName: 'Van Cozy', givenName: 'Jean-Claude' },
      note: 'Whatever.',
      phone: [{ number: '+33678987654', primary: true, type: undefined }],
      relationships: { groups: { data: [] } }
    }

    let received = null
    const onSubmit = contact => {
      received = contact
    }

    render(
      <AppLike client={client}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </AppLike>
    )

    const fields = {
      gender: 'male',
      givenName: 'Jean-Claude',
      familyName: 'Van Cozy',
      'phone[0].phone': '+33678987654',
      'email[0].email': 'jcvc@cozy.cloud',
      cozy: 'https://jcvd.cozy.cloud',
      company: 'Cozy CLoud',
      jobTitle: 'Dreamer',
      birthday: '2015-12-31',
      birthplace: 'somewhere',
      note: 'Whatever.'
    }

    const form = screen.getByRole('form')
    for (const fieldName of Object.keys(fields)) {
      act(() => {
        const field = form.querySelector(`[name='${fieldName}']`)
        expect(field).not.toBeNull()
        fireEvent.change(field, { target: { value: fields[fieldName] } })
      })
    }

    const addressBtn = form.querySelector('[name="address[0].address"]')
    fireEvent.click(addressBtn)

    const addressStreet = screen
      .getAllByRole('textbox')
      .find(t => t.name == 'address[0].addressstreet')

    act(() => {
      fireEvent.change(addressStreet, {
        target: { value: '18 rue des fleurs, Pecado' }
      })
    })

    act(() => {
      fireEvent.click(screen.getByText('Ok'))
    })

    act(() => {
      fireEvent.submit(screen.getByRole('form'))
    })

    expect(received).toEqual(expected)
  })

  it('should change inputs value', () => {
    const testFields = {
      Firstname: 'Jean-Claude',
      Lastname: 'Van Cozy',
      Phone: '+33678987654',
      Email: 'jcvc@cozy.cloud',
      Address: '18 rue des fleurs, Pecado',
      'Cozy URL': 'https://jcvd.cozy.cloud',
      Company: 'Cozy CLoud',
      jobTitle: 'Dreamer',
      Birthday: '31/12/2015',
      Notes: 'Whatever.'
    }

    const props = setup({ contact: {} })
    const jsx = (
      <AppLike client={client}>
        <ContactForm {...props} />
      </AppLike>
    )
    render(jsx)

    for (const label of labels) {
      act(() => {
        fireEvent.change(screen.getByLabelText(label), {
          target: { value: testFields[label] }
        })
      })
    }

    expect(screen.queryByDisplayValue(testFields['Firstname'])).not.toBeNull()
    expect(screen.queryByDisplayValue(testFields['Notes'])).not.toBeNull()
  })

  it('should submit empty fields', () => {
    const expected = {
      address: [],
      birthday: '',
      birthplace: '',
      gender: '',
      company: '',
      cozy: [],
      displayName: '',
      email: [],
      fullname: '',
      indexes: { byFamilyNameGivenNameEmailCozyUrl: null },
      jobTitle: '',
      metadata: { cozy: true, version: 1 },
      name: { familyName: '', givenName: '' },
      note: '',
      phone: [],
      relationships: { groups: { data: [] } }
    }

    let received = null
    const onSubmit = contact => {
      received = contact
    }

    render(
      <AppLike client={client}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </AppLike>
    )

    act(() => {
      fireEvent.submit(screen.getByRole('form'))
    })

    expect(received).toEqual(expected)
  })
})
