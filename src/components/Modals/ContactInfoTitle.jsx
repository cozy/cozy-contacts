import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import log from 'cozy-logger'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import RenameIcon from 'cozy-ui/transpiled/react/Icons/Rename'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'

import { updateContactGroups } from '../../helpers/groups'
import { fullContactPropTypes } from '../ContactPropTypes'
import ContactIdentity from '../ContactCard/ContactIdentity'
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

const ContactInfoTitle = ({
  contact,
  allGroups,
  toggleEditMode,
  toggleConfirmDeleteModal
}) => {
  const { t } = useI18n()

  const handleChange = async nextGroups => {
    try {
      await updateContactGroups(contact, nextGroups)
    } catch (error) {
      Alerter.success('error.group_selected')
      log('error', `There was a problem when selecting a group : ${error}`)
    }
  }

  const handleOnGroupCreated = async createdGroup => {
    await contact.groups.addById(createdGroup._id)
  }

  const handleValue = get(contact, 'relationships.groups.data', [])

  return (
    <div className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s u-flex-justify-between">
      <ContactIdentity contact={contact} allGroups={allGroups} />
      <div className="u-flex u-flex-row u-ml-0-s u-mr-3 u-mr-0-s">
        <GroupsSelect
          contact={contact}
          allGroups={allGroups}
          styles={customStyles}
          onChange={handleChange}
          value={handleValue}
          components={{ Control }}
          isMulti
          onGroupCreated={handleOnGroupCreated}
          noOptionsMessage={() => t('groups.none')}
          withCheckbox
          menuPosition="fixed"
        />
        <Button
          theme="secondary"
          extension="narrow"
          icon={RenameIcon}
          iconOnly
          label={t('edit')}
          size="small"
          onClick={toggleEditMode}
        />
        <Button
          theme="secondary"
          extension="narrow"
          icon={TrashIcon}
          iconOnly
          label={t('delete')}
          size="small"
          onClick={toggleConfirmDeleteModal}
        />
      </div>
    </div>
  )
}

ContactInfoTitle.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  toggleConfirmDeleteModal: PropTypes.func.isRequired
}

export default ContactInfoTitle
