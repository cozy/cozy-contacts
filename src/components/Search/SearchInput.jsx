import debounce from 'lodash/debounce'
import React, { useMemo, useContext } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import MagnifierIcon from 'cozy-ui/transpiled/react/Icons/Magnifier'
import Input from 'cozy-ui/transpiled/react/Input'
import InputGroup from 'cozy-ui/transpiled/react/InputGroup'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import SearchContext from '../Contexts/Search'

const SearchInput = () => {
  const { t } = useI18n()
  const { setSearchValue } = useContext(SearchContext)

  const delayedSetSearchValue = useMemo(
    () => debounce(searchValue => setSearchValue(searchValue), 375),
    [setSearchValue]
  )

  const handleOnChange = ev => {
    delayedSetSearchValue(ev.target.value)
  }

  return (
    <InputGroup
      className="u-mb-half-s"
      prepend={
        <Icon
          className="u-pl-1"
          icon={MagnifierIcon}
          color="var(--iconTextColor)"
        />
      }
    >
      <Input placeholder={t('search')} onChange={handleOnChange} />
    </InputGroup>
  )
}

export default SearchInput
