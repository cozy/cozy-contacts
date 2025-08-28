import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import InputAdornment from 'cozy-ui/transpiled/react/InputAdornment'

/**
 * @type {import('../../../types').Field[]}
 */
export const fields = [
  {
    name: 'gender',
    icon: 'people',
    select: true,
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
      name: 'phoneLabel',
      select: true,
      customLabelOptions: {
        defaultType: '',
        defaultLabel: 'home'
      },
      options: [
        {
          value: '',
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
      name: 'emailLabel',
      select: true,
      customLabelOptions: {
        defaultType: '',
        defaultLabel: 'home'
      },
      options: [
        {
          value: '',
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
    type: 'text',
    InputProps: {
      readOnly: true
    },
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
      name: 'addressLabel',
      select: true,
      customLabelOptions: {
        defaultType: '',
        defaultLabel: 'home'
      },
      options: [
        {
          value: '',
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
      name: 'cozyLabel',
      select: true,
      customLabelOptions: {
        defaultType: '',
        defaultLabel: 'home'
      },
      options: [
        {
          value: '',
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
    InputLabelProps: { shrink: true }
  },
  {
    name: 'birthplace',
    icon: null,
    type: 'text'
  },
  {
    name: 'relatedContact',
    icon: 'relationship',
    InputProps: {
      readOnly: true,
      endAdornment: (
        <InputAdornment position="end">
          <Icon icon={BottomIcon} color="var(--iconTextColor)" />
        </InputAdornment>
      )
    },
    label: {
      name: 'relatedContactLabel',
      select: true,
      options: [
        {
          value: '',
          label: 'label.none'
        },
        {
          value: '{"type":"parent"}',
          label: 'label.relationship.parent'
        },
        {
          value: '{"type":"child"}',
          label: 'label.relationship.child'
        },
        {
          value: '{"type":"sibling"}',
          label: 'label.relationship.sibling'
        },
        {
          value: '{"type":"spouse"}',
          label: 'label.relationship.spouse'
        },
        {
          value: '{"type":"coResident"}',
          label: 'label.relationship.coResident'
        },
        {
          value: '{"type":"friend"}',
          label: 'label.relationship.friend'
        },
        {
          value: '{"type":"colleague"}',
          label: 'label.relationship.colleague'
        },
        {
          value: '{"type":"coWorker"}',
          label: 'label.relationship.coWorker'
        },
        {
          value: '{"type":"acquaintance"}',
          label: 'label.relationship.acquaintance'
        },
        {
          value: '{"type":"helper"}',
          label: 'label.relationship.helper'
        },
        {
          value: '{"type":"recipient"}',
          label: 'label.relationship.recipient'
        }
      ]
    },
    isArray: true
  },
  {
    name: 'note',
    icon: 'comment',
    type: 'text',
    multiline: true
  }
]
