import React from 'react'
import { mount } from 'enzyme'
import ContactForm from './index'
import { I18n } from 'cozy-ui/transpiled/react/I18n'

import { render, fireEvent } from '@testing-library/react'
import { createMockClient } from 'cozy-client'
import AppLike from '../../../tests/Applike'

import langEn from '../../../locales/en.json'
import { johnDoeContact as contact } from '../../../helpers/testData'

const dictRequire = () => langEn

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
    const { getByLabelText, getAllByRole } = render(jsx)
    expect(getAllByRole('label')).toHaveLength(labels.length)
    labels.map(label => {
      expect(getByLabelText(label)).toBeTruthy()
    })
  })

  it('should fill form with contact data', () => {
    const props = setup({ contact })
    const jsx = (
      <AppLike client={client}>
        <ContactForm {...props} />
      </AppLike>
    )
    const { getByDisplayValue } = render(jsx)
    expect(getByDisplayValue(contact.name.givenName)).toBeTruthy()
    expect(getByDisplayValue(contact.name.familyName)).toBeTruthy()
    expect(getByDisplayValue(contact.phone[0].number)).toBeTruthy()
    expect(getByDisplayValue(contact.email[0].address)).toBeTruthy()
    expect(getByDisplayValue(contact.address[0].formattedAddress)).toBeTruthy()
    expect(getByDisplayValue(contact.cozy[0].url)).toBeTruthy()
    expect(getByDisplayValue(contact.company)).toBeTruthy()
    expect(getByDisplayValue(contact.note)).toBeTruthy()
  })

  it('should submit a well formatted contact', () => {
    const onSubmit = contact => {
      expect(contact).toMatchSnapshot()
    }

    const form = mount(
      <I18n lang="en" dictRequire={dictRequire}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </I18n>
    )

    const fields = {
      givenName: 'Jean-Claude',
      familyName: 'Van Cozy',
      'phone[0].phone': '+33678987654',
      'email[0].email': 'jcvc@cozy.cloud',
      'address[0].address': '18 rue des fleurs, Pecado',
      cozy: 'https://jcvd.cozy.cloud',
      company: 'Cozy CLoud',
      birthday: '31/12/2015',
      note: 'Whatever.'
    }

    Object.keys(fields).forEach(fieldName => {
      const candidates = form.find(`Field[name='${fieldName}']`)
      const field = candidates.length === 1 ? candidates : candidates.first()
      field.simulate('change', { target: { value: fields[fieldName] } })
    })

    form.find('form').simulate('submit')
  })

  it('should change inputs value', async () => {
    const testFields = {
      Firstname: 'Jean-Claude',
      Lastname: 'Van Cozy',
      Phone: '+33678987654',
      Email: 'jcvc@cozy.cloud',
      Address: '18 rue des fleurs, Pecado',
      'Cozy URL': 'https://jcvd.cozy.cloud',
      Company: 'Cozy CLoud',
      Birthday: '31/12/2015',
      Notes: 'Whatever.'
    }

    const props = setup({ contact: {} })
    const jsx = (
      <AppLike client={client}>
        <ContactForm {...props} />
      </AppLike>
    )
    const { findByDisplayValue, getByLabelText } = render(jsx)

    labels.map(label => {
      fireEvent.change(getByLabelText(label), {
        target: { value: testFields[label] }
      })
    })

    expect(await findByDisplayValue(testFields['Firstname'])).toBeTruthy()
    expect(await findByDisplayValue(testFields['Notes'])).toBeTruthy()
  })

  it('should submit empty fields', () => {
    const onSubmit = contact => {
      expect(contact).toMatchSnapshot()
    }

    const form = mount(
      <I18n lang="en" dictRequire={dictRequire}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </I18n>
    )

    form.find('form').simulate('submit')
  })
})
