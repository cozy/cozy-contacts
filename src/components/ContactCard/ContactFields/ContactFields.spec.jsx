import React from 'react'
import { render, screen } from '@testing-library/react'

import ContactFields from './ContactFields'
import { I18n } from 'cozy-ui/transpiled/react/I18n'

describe('ContactFields', () => {
  it('should accept the strict minimum', () => {
    const fields = [{ type: 'other', values: [] }]
    const contactFieldsInstance = <ContactFields fields={fields} />
    render(contactFieldsInstance)
    const fieldsList = screen.queryByRole('list')
    const titleNodes = screen.queryByRole('heading')
    expect(fieldsList).not.toBeNull()
    expect(fieldsList.childElementCount).toEqual(0)
    expect(titleNodes).toBeNull()
  })

  it('should display a title', () => {
    const fields = [{ type: 'other', values: [] }]
    const title = 'Hello !'
    const contactFieldsInstance = (
      <ContactFields fields={fields} title={title} />
    )
    render(contactFieldsInstance)
    const titleNodes = screen.queryByRole('heading')
    expect(titleNodes).not.toBeNull()
    expect(titleNodes.textContent).toEqual(title)
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
    render(contactFieldsInstance)
    const fieldsNodes = screen.queryAllByRole('listitem')
    expect(fieldsNodes.length).toEqual(fields.length)
  })
})
