export const makeColumns = ({ t, isMobile }) => {
  const mobileColumns = [
    {
      id: 'fullname',
      label: t('fields.familyName'),
      width: '100%',
      sortable: false
    },
    {
      id: 'actions',
      width: 40,
      label: '',
      textAlign: 'center',
      disableClick: true,
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
      label: t('fields.email'),
      textAlign: 'left',
      width: '30%',
      sortable: false
    },
    {
      id: 'phone.[0].number',
      label: t('fields.phone'),
      textAlign: 'left',
      width: 'auto',
      sortable: false
    },
    {
      id: 'actions',
      width: 40,
      label: '',
      textAlign: 'center',
      disableClick: true,
      sortable: false
    }
  ]
}
