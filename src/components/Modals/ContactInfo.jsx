import React from 'react'
import { PropTypes } from 'prop-types'

import differenceBy from 'lodash/differenceBy'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ModalHeader, ModalContent } from 'cozy-ui/transpiled/react/Modal'
import Button from 'cozy-ui/transpiled/react/Button'

import { fullContactPropTypes } from '../ContactPropTypes'
import ContactCard from '../ContactCard/ContactCard'
import ContactGroups from '../ContactCard/ContactGroups'
import Control from '../ContactGroups/SelectBox/Control'

const customStyles = {
  container: base => ({
    ...base,
    display: 'inline-block',
    verticalAlign: 'middle',
    zIndex: 100000
  }),
  menu: base => ({
    ...base
  }),
  noOptionsMessage: () => ({}),
  option: base => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
}

const ContactInfo = ({
  contact,
  allGroups,
  toggleEditMode,
  toggleConfirmDeleteModal
}) => {
  const { t } = useI18n()

  const updateContactGroups = nextGroups => {
    const currentGroups = contact.groups.data
    const toAdd = differenceBy(nextGroups, currentGroups, '_id')
    const toRemove = differenceBy(currentGroups, nextGroups, '_id')

    if (toAdd.length > 0) contact.groups.addById(toAdd.map(({ _id }) => _id))
    else if (toRemove.length > 0)
      contact.groups.removeById(toRemove.map(({ _id }) => _id))
    // we can't do both at the same time right now, see https://github.com/cozy/cozy-client/issues/358
  }

  const addGroupToContact = async createdGroup => {
    await contact.groups.addById(createdGroup.data._id)
  }

  const userGroups = contact.groups.data
    .filter(group => group)
    .map(userGroup => allGroups.find(group => group._id === userGroup._id))
    .filter(value => value)

  return (
    <ContactCard
      contact={contact}
      allGroups={allGroups}
      renderHeader={children => (
        <ModalHeader className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s u-flex-justify-between">
          {children}
          <div className="u-flex u-flex-row u-ml-0-s u-mr-3 u-mr-0-s">
            <ContactGroups
              contact={contact}
              allGroups={allGroups}
              styles={customStyles}
              onChange={updateContactGroups}
              value={userGroups}
              control={Control}
              isMulti
              onGroupCreation={addGroupToContact}
              noOptionsMessage={() => t('groups.none')}
            />
            <Button
              theme="secondary"
              extension="narrow"
              icon="rename"
              iconOnly
              label={t('edit')}
              size="small"
              onClick={toggleEditMode}
            />
            <Button
              theme="secondary"
              extension="narrow"
              icon="trash"
              iconOnly
              label={t('delete')}
              size="small"
              onClick={toggleConfirmDeleteModal}
            />
          </div>
        </ModalHeader>
      )}
      renderBody={children => <ModalContent>{children}</ModalContent>}
    />
  )
}

ContactInfo.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired
}

export default ContactInfo
