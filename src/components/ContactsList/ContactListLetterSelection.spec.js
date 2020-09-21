import React from 'react'
import { shallow } from 'enzyme'
import Chip from 'cozy-ui/transpiled/react/Chip'

import { ContactListLetterSelection } from './ContactListLetterSelection'

describe('ContactListLetterSelection', () => {
  const wrapper = newProps => {
    const props = Object.assign(
      {},
      {
        onClick: () => {}
      },
      newProps
    )

    return shallow(<ContactListLetterSelection {...props} />)
  }

  it('should render', () => {
    const component = wrapper({})

    expect(component.find(Chip)).toHaveLength(27)
  })

  it('On click should return the value of the button', () => {
    const props = {
      letterList: ['A'],
      onClick: jest.fn()
    }

    const component = wrapper(props)
    component.find(Chip).simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})
