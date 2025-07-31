export const makeColumns = ({ t, isMobile }) => {
  const mobileColumns = [
    {
      id: 'fullname',
      label: t('fields.familyName'),
      width: '100%',
      sortable: false
    }
  ]

  if (isMobile) {
    return mobileColumns
  }

  return [
    {
      id: 'fullname',
      disablePadding: true,
      label: t('fields.familyName'),
      width: '45%',
      sortable: false
    },
    {
      id: 'email.[0].address',
      disablePadding: false,
      label: t('fields.email'),
      textAlign: 'left',
      width: '30%',
      sortable: false
    },
    {
      id: 'phone.[0].number',
      disablePadding: false,
      label: t('fields.phone'),
      textAlign: 'left',
      width: '25%',
      sortable: false
    }
  ]
}
