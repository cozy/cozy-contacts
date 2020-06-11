import React from 'react'
import { DumpContactCardModal } from './ContactCardModal'
import { shallow, mount } from 'enzyme'
import AppLike from '../../tests/Applike'

const fakedContact = {
  id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
  _type: 'io.cozy.contacts',
  _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
  address: [],
  company: '',
  cozy: [{ primary: true, url: 'https://q.mycozy.cloud' }],
  cozyMetadata: {
    createdAt: '2019-05-21T12:24:01.084Z',
    createdByApp: 'Contacts',
    createdByAppVersion: '0.8.3',
    doctypeVersion: 2,
    metadataVersion: 1,
    updatedAt: '2019-07-15T11:22:13.621Z',
    updatedByApps: [
      { date: '2019-07-15T11:22:13.621Z', slug: 'Contacts', version: '0.8.5' }
    ]
  },
  email: [{ address: 'quentin@cozycloud.cc', primary: true }],
  fullname: 'quentin valmori',
  me: true,
  metadata: { cozy: true, version: 1 },
  name: { familyName: 'valmori', givenName: 'quentin' },
  note: '',
  phone: [{ number: '+33600041300', primary: true }],
  relationships: {
    accounts: { data: [] },
    groups: {
      data: [
        {
          _id: '5b49553c5916cf7b5b2a5f48600078a8',
          _type: 'io.cozy.contacts.groups'
        }
      ]
    }
  },
  groups: {
    target: {
      id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _id: '4e33fd27e1d8e55a34742bac6d16d3bd',
      _type: 'io.cozy.contacts',
      _rev: '6-57f4ab78b1fb97bb90ea273ec881f196',
      company: '',
      fullname: 'quentin valmori',
      me: true,
      note: ''
    },
    name: 'groups',
    doctype: 'io.cozy.contacts.groups',
    data: [
      {
        _id: '5b49553c5916cf7b5b2a5f48600078a8',
        _type: 'io.cozy.contacts.groups'
      }
    ]
  },
  accounts: { name: 'accounts', doctype: 'io.cozy.contacts.accounts', data: [] }
}

const fakedAllGroups = [
  {
    id: '5b49553c5916cf7b5b2a5f48600078a8',
    _id: '5b49553c5916cf7b5b2a5f48600078a8',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-7862def64fb044932d3264e2f8477454',
    cozyMetadata: {
      createdAt: '2019-07-15T11:22:13.551Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.5',
      metadataVersion: 1,
      updatedAt: '2019-07-15T11:22:13.551Z',
      updatedByApps: [
        { date: '2019-07-15T11:22:13.551Z', slug: 'Contacts', version: '0.8.5' }
      ]
    },
    metadata: { version: 1 },
    name: '2018-2019 Enseignants'
  },
  {
    id: '8cb7ea7fe264260e997529439b0091c0',
    _id: '8cb7ea7fe264260e997529439b0091c0',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-8b92242f1ccaca20e7862306cddbe37f',
    cozyMetadata: {
      createdAt: '2020-04-15T06:46:20.128Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.7',
      metadataVersion: 1,
      updatedAt: '2020-04-15T06:46:20.128Z',
      updatedByApps: [
        { date: '2020-04-15T06:46:20.128Z', slug: 'Contacts', version: '0.8.7' }
      ]
    },
    metadata: { version: 1 },
    name: 'ez'
  },
  {
    id: '18c031b0ac9f47cdc48b275b1900726d',
    _id: '18c031b0ac9f47cdc48b275b1900726d',
    _type: 'io.cozy.contacts.groups',
    _rev: '1-f438477a749fa0b90cde2e7c53a41bd6',
    cozyMetadata: {
      createdAt: '2019-11-08T07:45:55.424Z',
      createdByApp: 'Contacts',
      createdByAppVersion: '0.8.6',
      metadataVersion: 1,
      updatedAt: '2019-11-08T07:45:55.424Z',
      updatedByApps: [
        { date: '2019-11-08T07:45:55.424Z', slug: 'Contacts', version: '0.8.6' }
      ]
    },
    metadata: { version: 1 },
    name: 'groupe test'
  }
]
const setup = ({
  fetchStatusContact,
  allGroupsContactStatus,
  editMode,
  shouldDisplayConfirmDeleteModal,
  contact,
  allGroups
}) => {
  return {
    fetchStatusContact,
    allGroupsContactStatus,
    editMode,
    shouldDisplayConfirmDeleteModal,
    contact,
    allGroups,
    t: x => x,
    toggleConfirmDeleteModal: jest.fn,
    toggleEditMode: jest.fn,
    deleteContact: jest.fn
  }
}

describe('ContactCardModal', () => {
  it('test if we display the Spinner', () => {
    const props = setup({
      fetchStatusContact: 'loading',
      allGroupsContactStatus: 'loading',
      editMode: false,
      shouldDisplayConfirmDeleteModal: false,
      contact: null,
      allGroups: null
    })
    const jsx = <DumpContactCardModal {...props} />
    const wrapper = shallow(jsx)
    expect(wrapper).toMatchSnapshot()
  })

  it('test if we display the contact card', () => {
    const props = setup({
      fetchStatusContact: 'loaded',
      allGroupsContactStatus: 'loaded',
      editMode: false,
      shouldDisplayConfirmDeleteModal: false,
      contact: fakedContact,
      allGroups: fakedAllGroups
    })
    const jsx = (
      <AppLike>
        <DumpContactCardModal {...props} />
      </AppLike>
    )
    const wrapper = mount(jsx)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('test if we display the delete confirmation modal', () => {
    const props = setup({
      fetchStatusContact: 'loaded',
      allGroupsContactStatus: 'loaded',
      editMode: false,
      shouldDisplayConfirmDeleteModal: true,
      contact: fakedContact,
      allGroups: fakedAllGroups
    })
    const jsx = (
      <AppLike>
        <DumpContactCardModal {...props} />
      </AppLike>
    )
    const wrapper = mount(jsx)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('test if we display the edit form modal', () => {
    const props = setup({
      fetchStatusContact: 'loaded',
      allGroupsContactStatus: 'loaded',
      editMode: true,
      shouldDisplayConfirmDeleteModal: false,
      contact: fakedContact,
      allGroups: fakedAllGroups
    })
    const jsx = (
      <AppLike>
        <DumpContactCardModal {...props} />
      </AppLike>
    )
    const wrapper = mount(jsx)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
