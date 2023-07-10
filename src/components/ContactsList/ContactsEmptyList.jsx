import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Empty from 'cozy-ui/transpiled/react/Empty'
import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import Infos from 'cozy-ui/transpiled/react/deprecated/Infos'
import Stack from 'cozy-ui/transpiled/react/Stack'
import PlusIcon from 'cozy-ui/transpiled/react/Icons/Plus'
import InfoIcon from 'cozy-ui/transpiled/react/Icons/Info'
import TeamIcon from 'cozy-ui/transpiled/react/Icons/Team'

import StoreButton from '../Common/StoreButton'
import EmptyIcon from '../../assets/icons/empty-contact-list.svg'
import SearchContext from '../Contexts/Search'
import SelectedGroupContext from '../Contexts/SelectedGroup'
import { hasSelectedGroup } from '../../helpers/groups'

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
  const { searchValue } = useContext(SearchContext)
  const { selectedGroup } = useContext(SelectedGroupContext)

  const isContactsFiltered =
    searchValue.length > 0 || hasSelectedGroup(selectedGroup)

  const emptyTitle = isContactsFiltered
    ? t('empty.title_filtered')
    : t('empty.title')

  return (
    <div className="u-flex u-flex-column u-flex-items-center">
      <Empty className="contacts-empty" icon={EmptyIcon} title={emptyTitle}>
        <Stack spacing="xs" className="u-mt-1">
          <div>
            <Button
              onClick={() => navigate('/import')}
              label={t('empty.import_vcard')}
              theme="secondary"
              icon={TeamIcon}
              style={style}
              extension="full"
            />
          </div>
          <div>
            <StoreButton />
          </div>
        </Stack>
        <Button
          className="u-mt-1-half"
          subtle
          theme="secondary"
          onClick={() => navigate('/new')}
          icon={PlusIcon}
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
