import debounce from 'lodash/debounce'
import React, { useMemo, useContext } from 'react'

import SearchBar from 'cozy-ui/transpiled/react/SearchBar'
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
    <SearchBar
      size="small"
      elevation={0}
      placeholder={t('search')}
      onChange={handleOnChange}
    />
  )
}

export default SearchInput
