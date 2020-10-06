import React from 'react'
import { PropTypes } from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ModalHeader, ModalContent } from 'cozy-ui/transpiled/react/Modal'
import Button from 'cozy-ui/transpiled/react/Button'

import { updateContactGroups } from '../../helpers/groups'
import { fullContactPropTypes } from '../ContactPropTypes'
import ContactCard from '../ContactCard/ContactCard'
import GroupsSelect from '../GroupsSelect/GroupsSelect'
import Control from '../GroupsSelect/SelectBox/Control'

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

  const handleChange = nextGroups => {
    updateContactGroups(contact, nextGroups)
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
            <GroupsSelect
              contact={contact}
              allGroups={allGroups}
              styles={customStyles}
              onChange={handleChange}
              value={userGroups}
              control={Control}
              isMulti
              onGroupCreation={addGroupToContact}
              noOptionsMessage={() => t('groups.none')}
              withCheckbox
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
