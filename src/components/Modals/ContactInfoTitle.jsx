import get from 'lodash/get'
import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import minilog from 'cozy-minilog'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Grid from 'cozy-ui/transpiled/react/Grid'
import Icon from 'cozy-ui/transpiled/react/Icon'
import RenameIcon from 'cozy-ui/transpiled/react/Icons/Rename'
import StarIcon from 'cozy-ui/transpiled/react/Icons/Star'
import StarOutlineIcon from 'cozy-ui/transpiled/react/Icons/StarOutline'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { updateContact } from '../../connections/allContacts'
import { updateContactGroups } from '../../helpers/groups'
import ContactIdentity from '../ContactCard/ContactIdentity'
import { fullContactPropTypes } from '../ContactPropTypes'
import GroupsSelect from '../GroupsSelect/GroupsSelect'
import Control from '../GroupsSelect/SelectBox/Control'

import { createGroup, updateGroup } from '@/connections/allGroups'

const log = minilog('ContactInfoTitle')

const customStyles = {
  container: base => ({
    ...base,
    display: 'inline-block',
    verticalAlign: 'middle'
  }),
  noOptionsMessage: () => ({}),
  option: base => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })
}

const ContactInfoTitle = ({ contact, allGroups }) => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { showAlert } = useAlert()
  const client = useClient()

  const handleChange = async nextGroups => {
    try {
      await updateContactGroups(contact, nextGroups)
    } catch (error) {
      showAlert({ severity: 'error', message: t('error.group_selected') })
      log.error('There was a problem when selecting a group', error)
    }
  }

  const handleOnGroupCreated = async createdGroup => {
    await contact.groups.addById(createdGroup._id)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledUpdateContact = useCallback(throttle(updateContact, 500), [])

  const handleFavorite = () => {
    throttledUpdateContact({
      client,
      contact,
      attributes: {
        cozyMetadata: {
          favorite: !contact.cozyMetadata?.favorite
        }
      }
    })
  }
  const isFavorite = contact.cozyMetadata?.favorite ?? false
  const favoriteIcon = isFavorite ? StarIcon : StarOutlineIcon

  const handleValue = get(contact, 'relationships.groups.data', [])

  return (
    <div className="u-flex u-flex-items-center u-flex-column-s u-pr-1-half-s u-flex-justify-between">
      <ContactIdentity contact={contact} allGroups={allGroups} />
      <Grid container spacing={1} className="u-w-auto u-ml-0-s u-mr-3 u-mr-0-s">
        <Grid item>
          <GroupsSelect
            allGroups={allGroups}
            styles={customStyles}
            value={handleValue}
            components={{ Control }}
            isMulti
            noOptionsMessage={() => t('groups.none')}
            withCheckbox
            menuPosition="fixed"
            onChange={handleChange}
            onGroupCreated={handleOnGroupCreated}
            onGroupCreate={createGroup}
            onGroupUpdate={updateGroup}
          />
        </Grid>
        <Grid item>
          <Button
            className="u-miw-auto"
            variant="secondary"
            label={<Icon icon={favoriteIcon} size={12} />}
            size="small"
            onClick={handleFavorite}
            aria-label={t('edit')}
          />
        </Grid>
        <Grid item>
          <Button
            className="u-miw-auto"
            variant="secondary"
            label={<Icon icon={RenameIcon} size={12} />}
            size="small"
            onClick={() => navigate('edit')}
            aria-label={t('edit')}
          />
        </Grid>
        <Grid item>
          <Button
            className="u-miw-auto"
            variant="secondary"
            label={<Icon icon={TrashIcon} size={12} />}
            onClick={() => navigate('delete')}
            aria-label={t('delete')}
            size="small"
          />
        </Grid>
      </Grid>
    </div>
  )
}

ContactInfoTitle.propTypes = {
  contact: fullContactPropTypes.isRequired,
  allGroups: PropTypes.array.isRequired
}

export default ContactInfoTitle
