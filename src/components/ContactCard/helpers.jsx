import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import InputAdornment from 'cozy-ui/transpiled/react/InputAdornment'

/**
 * @param {object} props
 * @param {{ name: string, setIsAddressDialogOpen: import('react').Dispatch<import('react').SetStateAction<boolean>> }} opts
 * @returns {object}
 */
export const handleContactFieldInputProps = (props, opts) => {
  const { name, setIsAddressDialogOpen, setIsRelatedContactDialogOpen } = opts
  if (name.includes('address')) {
    return {
      ...props,
      onClick: () => setIsAddressDialogOpen(true),
      inputProps: { className: 'u-ta-left u-spacellipsis u-h-100' }
    }
  }

  if (name.includes('relatedContact')) {
    return {
      ...props,
      onClick: () => setIsRelatedContactDialogOpen(true),
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <Icon icon={BottomIcon} />
            </IconButton>
          </InputAdornment>
        )
      }
    }
  }

  return props
}
