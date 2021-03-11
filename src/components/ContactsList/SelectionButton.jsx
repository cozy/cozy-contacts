import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Button'
import flag from 'cozy-flags'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

export const SelectionButton = ({
  areAllContactsSelected,
  handleAllContactSelection
}) => {
  const { t } = useI18n()
  return (
    <>
      {flag('select-all-contacts') && (
        <div>
          <Button
            label={areAllContactsSelected ? t('unselect-all') : t('select-all')}
            theme="secondary"
            onClick={handleAllContactSelection}
          />
        </div>
      )}
    </>
  )
}

SelectionButton.propTypes = {
  areAllContactsSelected: PropTypes.bool.isRequired,
  handleAllContactSelection: PropTypes.func.isRequired
}

export default SelectionButton
