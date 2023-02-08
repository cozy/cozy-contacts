export const fields = [
  {
    name: 'givenName',
    icon: 'people',
    type: 'text'
  },
  {
    name: 'familyName',
    icon: null,
    type: 'text'
  },
  {
    name: 'company',
    icon: 'company',
    type: 'text'
  },
  {
    name: 'jobTitle',
    icon: null,
    type: 'text'
  },
  {
    name: 'phone',
    icon: 'telephone',
    type: 'tel',
    hasLabel: true,
    isArray: true
  },
  {
    name: 'email',
    icon: 'email',
    type: 'email',
    hasLabel: true,
    isArray: true
  },
  {
    name: 'address',
    icon: 'location',
    type: 'text',
    hasLabel: true,
    isArray: true
  },
  {
    name: 'cozy',
    icon: 'cloud',
    type: 'url',
    hasLabel: true
  },
  {
    name: 'birthday',
    icon: 'calendar',
    type: 'date',
    labelProps: { shrink: true }
  },
  {
    name: 'note',
    icon: 'comment',
    type: 'text',
    isMultiline: true
  }
]
