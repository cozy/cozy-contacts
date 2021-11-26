import { render } from '@testing-library/react'
import AppLike from '../../tests/Applike'
import React from 'react'
import HeaderNavigator from './HeaderNavigator'

const setup = ({ headersWithRef } = {}) => {
  const root = render(
    <AppLike>
      <HeaderNavigator headersWithRef={headersWithRef} />
    </AppLike>
  )
  return { root }
}

describe('HeaderNavigator', () => {
  it('should show a capitalized item per header', () => {
    const { root } = setup({
      headersWithRef: [['a', React.createRef()], ['z', React.createRef()]]
    })
    const { getByText } = root
    expect(getByText('A'))
    expect(getByText('Z'))
  })
})
