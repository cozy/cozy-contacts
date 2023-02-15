const gender = [
  {
    value: 'male',
    label: 'man'
  },
  {
    value: 'female',
    label: 'woman'
  }
]

export const fields = [
  {
    name: 'gender',
    icon: 'people',
    type: 'text',
    select: true,
    selectValue: gender
  },
  {
    name: 'givenName',
    icon: null,
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
    name: 'birthplace',
    icon: null,
    type: 'text'
  },
  {
    name: 'note',
    icon: 'comment',
    type: 'text',
    isMultiline: true
  }
]
