import React, { useMemo, useContext } from 'react'
import debounce from 'lodash/debounce'

import InputGroup from 'cozy-ui/transpiled/react/InputGroup'
import Input from 'cozy-ui/transpiled/react/Input'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import palette from 'cozy-ui/transpiled/react/palette'
import Icon from 'cozy-ui/transpiled/react/Icon'

import SearchContext from '../Contexts/Search'

const Search = () => {
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
      className="u-mb-half-s u-mr-0-s u-mr-1"
      prepend={
        <Icon className="u-pl-1" icon="magnifier" color={palette['coolGrey']} />
      }
    >
      <Input placeholder={t('search')} onChange={handleOnChange} />
    </InputGroup>
  )
}

export default Search
