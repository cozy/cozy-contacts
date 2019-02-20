import React from 'react'
import { shallow } from 'enzyme'
import withContactsMutations from './allContacts'
import AppLike from '../tests/Applike'

const DummyComponent = () => <span />
const DummyComponentWithMutations = withContactsMutations(DummyComponent)

describe('Cozy Contacts API', () => {
  let testedComponent, client
  beforeEach(() => {
    client = {
      create: jest.fn(),
      save: jest.fn(),
      destroy: jest.fn()
    }

    const root = (
      <AppLike>
        <DummyComponentWithMutations client={client} />
      </AppLike>
    )
    const app = shallow(root)
    const wrappedComponent = app.find(DummyComponentWithMutations)
    testedComponent = wrappedComponent.dive()
  })

  it('should delete a contact with no sources', () => {
    const contact = {
      _id: '123',
      cozyMetadata: {
        sync: {}
      }
    }
    testedComponent.prop('deleteContact')(contact)
    expect(client.destroy).toHaveBeenCalledWith(contact)

    const contactWithoutMetadata = {
      _id: '456'
    }
    testedComponent.prop('deleteContact')(contactWithoutMetadata)
    expect(client.destroy).toHaveBeenCalledWith(contactWithoutMetadata)
  })

  it('should flag a contact with sources as trashed', () => {
    const contact = {
      _id: '123',
      cozyMetadata: {
        sync: {
          '456': {
            id: 'people/657623'
          }
        }
      }
    }
    testedComponent.prop('deleteContact')(contact)
    expect(client.destroy).not.toHaveBeenCalled()
    expect(client.save).toHaveBeenCalledWith({
      ...contact,
      trashed: true
    })
  })
})
