import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Icon from 'cozy-ui/transpiled/react/Icon'
import InfoIcon from 'cozy-ui/transpiled/react/Icons/Info'
import PersonAddIcon from 'cozy-ui/transpiled/react/Icons/PersonAdd'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Infos from 'cozy-ui/transpiled/react/deprecated/Infos'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import EmptyIcon from '../../assets/icons/empty-contact-list.svg'
import { hasSelectedGroup } from '../../helpers/groups'
import StoreButton from '../Common/StoreButton'
import { useSearch } from '../Contexts/Search'
import SelectedGroupContext from '../Contexts/SelectedGroup'

const style = { pointerEvents: 'all' }

const SoonComponent = ({ t }) => (
  <div className="u-pt-1 u-pb-2">
    <Infos text={t('importation.available_soon')} icon={InfoIcon} />
  </div>
)

const ContactsEmptyList = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { isDesktop } = useBreakpoints()
  const { searchValue } = useSearch()
  const { selectedGroup } = useContext(SelectedGroupContext)

  const isContactsFiltered =
    searchValue.length > 0 || hasSelectedGroup(selectedGroup)

  const emptyTitle = isContactsFiltered
    ? t('empty.title_filtered')
    : t('empty.title')

  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Empty
        className="contacts-empty"
        icon={EmptyIcon}
        title={emptyTitle}
        iconSize="large"
      >
        <Stack spacing="xs" className="u-mt-1">
          <div>
            <Button
              onClick={() => navigate('/import')}
              label={t('empty.import_vcard')}
              variant="secondary"
              startIcon={<Icon icon={TeamIcon} />}
              style={style}
              fullWidth
            />
          </div>
          <div>
            <StoreButton />
          </div>
        </Stack>
        <Button
          className="u-mt-1-half"
          variant="text"
          onClick={() => navigate('/new')}
          startIcon={<Icon icon={PersonAddIcon} />}
          label={t('create_contact')}
          style={style}
        />
        {!isDesktop && <SoonComponent t={t} />}
      </Empty>
      {isDesktop && <SoonComponent t={t} />}
    </div>
  )
}

export default ContactsEmptyList
