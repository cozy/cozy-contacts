import React from 'react'
import { ContactCardModal, DumbContactCardModal } from './ContactCardModal'
import { render } from '@testing-library/react'
import { createMockClient } from 'cozy-client'
import AppLike from '../../tests/Applike'
import { fakedContact } from '../../../fixtures/contacts'
import { fakedAllGroups } from '../../../fixtures/groups'

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
    t: x => x,
    toggleConfirmDeleteModal: jest.fn,
    toggleEditMode: jest.fn,
    shouldDisplayConfirmDeleteModal,
    deleteContact: jest.fn
  }
}

describe('ContactCardModal', () => {
  it('should display the spinner', async () => {
    const props = {
      id: 'contactCardModal',
      onClose: jest.fn,
      deleteContact: jest.fn
    }
    const jsx = (
      <AppLike client={client}>
        <ContactCardModal {...props} />
      </AppLike>
    )

    const { findByTestId } = render(jsx)
    expect(await findByTestId('contactSpinner'))
  })

  it('should display the contact card', () => {
    const props = setup({
      editMode: false,
      contact: fakedContact,
      allGroups: fakedAllGroups,
      shouldDisplayConfirmDeleteModal: false
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )
    const { getByText } = render(jsx)
    expect(getByText(fakedContact.fullname))
  })

  it('should display the delete confirmation modal', () => {
    const props = setup({
      editMode: false,
      contact: fakedContact,
      allGroups: fakedAllGroups,
      shouldDisplayConfirmDeleteModal: true
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )

    const { getByText } = render(jsx)
    expect(getByText('delete-confirmation.title'))
  })

  it('should display the edit form modal', () => {
    const props = setup({
      editMode: true,
      contact: fakedContact,
      allGroups: fakedAllGroups,
      shouldDisplayConfirmDeleteModal: false
    })

    const jsx = (
      <AppLike client={client}>
        <DumbContactCardModal {...props} />
      </AppLike>
    )

    const { getByText } = render(jsx)
    expect(getByText('edit-contact'))
  })
})
