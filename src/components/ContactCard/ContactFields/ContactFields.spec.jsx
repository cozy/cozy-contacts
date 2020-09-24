import React from 'react'
import { mount } from 'enzyme'

import ContactFields from './ContactFields'
import { I18n } from 'cozy-ui/transpiled/react/I18n'

describe('ContactFields', () => {
  it('should accept the strict minimum', () => {
    const fields = [{ type: 'other', values: [] }]
    const contactFieldsInstance = <ContactFields fields={fields} />
    const contactFields = mount(contactFieldsInstance)
    const fieldsList = contactFields.find('ol.contact-field-list')
    const titleNode = contactFields.find('h3.contact-fields-title')
    expect(fieldsList.children().length).toEqual(0)
    expect(titleNode.length).toEqual(0)
  })

  it('should display a title', () => {
    const fields = [{ type: 'other', values: [] }]
    const title = 'Hello !'
    const contactFieldsInstance = (
      <ContactFields fields={fields} title={title} />
    )
    const contactFields = mount(contactFieldsInstance)
    const titleNode = contactFields.find('h3')
    expect(titleNode.length).toEqual(1)
    expect(titleNode.text()).toEqual(title)
  })

  it('should display simple values', () => {
    const fields = [
      { type: 'phone', values: [{ phone: '+XX X XX XX XX XX' }] },
      { type: 'email', values: [{ address: 'mail@example.com' }] },
      { type: 'other', values: [{ text: 'something' }] }
    ]

    const contactFieldsInstance = (
      <I18n lang="en" dictRequire={() => ''}>
        <ContactFields fields={fields} />
      </I18n>
    )
    const contactFields = mount(contactFieldsInstance)
    const fieldsNodes = contactFields.find('ContactField')

    expect(fieldsNodes.length).toEqual(fields.length)
  })
})
