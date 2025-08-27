import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import InputAdornment from 'cozy-ui/transpiled/react/InputAdornment'

/**
 * @param {object} props
 * @param {{ name: string, setIsAddressDialogOpen: import('react').Dispatch<import('react').SetStateAction<boolean>> }} opts
 * @returns {object}
 */
export const handleContactFieldInputProps = (
  props,
  { name, setIsAddressDialogOpen, setIsRelatedContactDialogOpen }
) => {
  if (name.includes('address')) {
    return {
      ...props,
      onClick: () => setIsAddressDialogOpen(true)
    }
  }

  if (name.includes('relatedContact')) {
    return {
      ...props,
      onClick: () => setIsRelatedContactDialogOpen(true),
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <Icon icon={BottomIcon} color="var(--iconTextColor)" />
          </InputAdornment>
        )
      }
    }
  }

  return props
}
