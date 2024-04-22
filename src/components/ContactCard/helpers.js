/**
 * @param {object} props
 * @param {{ name: string, setIsAddressDialogOpen: import('react').Dispatch<import('react').SetStateAction<boolean>> }} opts
 * @returns {object}
 */
export const handleContactFieldInputProps = (props, opts) => {
  const { name, setIsAddressDialogOpen } = opts
  if (name.includes('address')) {
    return {
      ...props,
      onClick: () => setIsAddressDialogOpen(true),
      inputProps: { className: 'u-ta-left u-spacellipsis u-h-100' }
    }
  }

  return props
}
