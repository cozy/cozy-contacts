import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('should contain a filter letters', () => {
    // When
    const { queryByText } = render(
      <Header
        left={<div>left</div>}
        right={<div>right</div>}
        letters={<div>letters</div>}
      ></Header>
    )

    // Then
    expect(queryByText('letters')).toBeDefined()
  })
})
