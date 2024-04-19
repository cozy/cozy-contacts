const isAddressField = ({ subFields, type }) => {
  return Boolean(subFields) && type === 'button'
}

/**
 * @param {object} props
 * @param {{ name: string, setIsAddressDialogOpen: import('react').Dispatch<import('react').SetStateAction<boolean>> }} opts
 */
export const handleContactFieldInputProps = (props, opts) => {
  const { attributes, setIsAddressDialogOpen } = opts
  if (isAddressField(attributes)) {
    return {
      ...props,
      onClick: () => setIsAddressDialogOpen(true),
      inputProps: { className: 'u-ta-left u-spacellipsis u-h-100' }
    }
  }

  return props
}
