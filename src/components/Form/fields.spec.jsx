import React from 'react'
import { Field, Form } from 'react-final-form'
import renderer from 'react-test-renderer'

import { AdaptedInput, AdaptedTextarea } from './fields'

describe('AdaptedInput', () => {
  it('should adapt cozy-ui input for react-final-form', () => {
    const jsx = (
      <Form
        initialValues={{ title: 'Hello' }}
        onSubmit={jest.fn()}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="title" component={AdaptedInput} />
          </form>
        )}
      />
    )
    const tree = renderer.create(jsx).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('AdaptedTextarea', () => {
  it('should adapt cozy-ui input for react-final-form', () => {
    const jsx = (
      <Form
        initialValues={{
          description: 'Nostrum expedita qui rerum non est asperiores ratione.'
        }}
        onSubmit={jest.fn()}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="description" component={AdaptedTextarea} />
          </form>
        )}
      />
    )
    const tree = renderer.create(jsx).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
