import React from 'react'
import DumbContactCardModal from './DumbContactCardModal'
import { render } from '@testing-library/react'
import { createMockClient } from 'cozy-client'

import AppLike from '../../tests/Applike'
import { contactWithGroup as contact, groups } from '../../helpers/testData'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())

const client = createMockClient({})
const setup = ({
  editMode,
  contact,
  allGroups,
  shouldDisplayConfirmDeleteModal
}) => {
  return {
    editMode,
    contact,
    allGroups,
    toggleConfirmDeleteModal: jest.fn(),
    toggleEditMode: jest.fn(),
    shouldDisplayConfirmDeleteModal,
    onDeleteContact: jest.fn(),
    dataHaveBeenLoaded: true,
    onClose: jest.fn()
  }
}

describe('DumbContactCardModal', () => {
  it('should display the contact card', () => {
    const props = setup({
      editMode: false,
      contact: contact,
      allGroups: groups,
      shouldDisplayConfirmDeleteModal: false
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )
    const { getByText } = render(jsx)
    expect(getByText(contact.fullname))
  })

  it('should display the delete confirmation modal', () => {
    const props = setup({
      editMode: false,
      contact: contact,
      allGroups: groups,
      shouldDisplayConfirmDeleteModal: true
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )

    const { getByText } = render(jsx)
    expect(getByText(contact.fullname))
    expect(getByText('Delete this contact?'))
  })

  it('should display the edit form modal', () => {
    const props = setup({
      editMode: true,
      contact: contact,
      allGroups: groups,
      shouldDisplayConfirmDeleteModal: false
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )

    const { getByText } = render(jsx)
    expect(getByText('Edit contact'))
  })
})
