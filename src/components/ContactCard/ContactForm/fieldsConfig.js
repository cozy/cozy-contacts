export const fields = [
  {
    name: 'gender',
    icon: 'people',
    options: [
      {
        value: 'male',
        label: 'gender.man'
      },
      {
        value: 'female',
        label: 'gender.woman'
      }
    ]
  },
  {
    name: 'givenName',
    icon: null,
    type: 'text'
  },
  {
    name: 'additionalName',
    icon: null,
    type: 'text'
  },
  {
    name: 'familyName',
    icon: null,
    type: 'text'
  },
  {
    name: 'surname',
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
    label: {
      options: [
        {
          value: undefined,
          label: 'label.none'
        },
        {
          value: '{"type":"cell","label":"home"}',
          label: 'label.phone.cell-home'
        },
        {
          value: '{"type":"cell","label":"work"}',
          label: 'label.phone.cell-work'
        },
        {
          value: '{"type":"voice","label":"home"}',
          label: 'label.phone.voice-home'
        },
        {
          value: '{"type":"voice","label":"work"}',
          label: 'label.phone.voice-work'
        },
        {
          value: '{"type":"fax","label":"home"}',
          label: 'label.phone.fax-home'
        },
        {
          value: '{"type":"fax","label":"work"}',
          label: 'label.phone.fax-work'
        }
      ]
    },
    isArray: true
  },
  {
    name: 'email',
    icon: 'email',
    type: 'email',
    label: {
      options: [
        {
          value: undefined,
          label: 'label.none'
        },
        {
          value: '{"label":"home"}',
          label: 'label.home'
        },
        {
          value: '{"label":"work"}',
          label: 'label.work'
        }
      ]
    },
    isArray: true
  },
  {
    name: 'address',
    icon: 'location',
    type: 'button',
    subFields: [
      {
        name: 'street',
        icon: null,
        type: 'text'
      },
      {
        name: 'number',
        icon: null,
        type: 'text'
      },
      {
        name: 'building',
        icon: null,
        type: 'text'
      },
      {
        name: 'stairs',
        icon: null,
        type: 'text'
      },
      {
        name: 'floor',
        icon: null,
        type: 'text'
      },
      {
        name: 'apartment',
        icon: null,
        type: 'text'
      },
      {
        name: 'entrycode',
        icon: null,
        type: 'text'
      },
      {
        name: 'locality',
        icon: null,
        type: 'text'
      },
      {
        name: 'code',
        icon: null,
        type: 'text'
      },
      {
        name: 'city',
        icon: null,
        type: 'text'
      },
      {
        name: 'region',
        icon: null,
        type: 'text'
      },
      {
        name: 'country',
        icon: null,
        type: 'text'
      }
    ],
    label: {
      options: [
        {
          value: undefined,
          label: 'label.none'
        },
        {
          value: '{"label":"home"}',
          label: 'label.address.home'
        },
        {
          value: '{"label":"work"}',
          label: 'label.address.work'
        }
      ]
    },
    isArray: true
  },
  {
    name: 'cozy',
    icon: 'cloud',
    type: 'url',
    label: {
      options: [
        {
          value: undefined,
          label: 'label.none'
        },
        {
          value: '{"label":"home"}',
          label: 'label.home'
        },
        {
          value: '{"label":"work"}',
          label: 'label.work'
        }
      ]
    }
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
