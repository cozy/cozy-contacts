import React from 'react'
import renderer from 'react-test-renderer'
import Navigation from './Navigation'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'

describe('Navigation component', () => {
  it('render correctly navigation component', () => {
    const NavigationComponent = renderer
      .create(<Navigation letters={[]} />)
      .toJSON()
    expect(NavigationComponent).toMatchSnapshot()
  })

  it('render navigation correctly with default props for letters', () => {
    const NavigationComponent = mount(<Navigation />)
    expect(NavigationComponent.prop('letters')).toEqual([])
  })

  it('render navigation correctly with letters', () => {
    const NavigationComponent = mount(<Navigation letters={['A', 'B']} />)
    expect(NavigationComponent.prop('letters')).toEqual(['A', 'B'])
  })

  it('Navigation component renders button link A and B', () => {
    const { getByText } = render(<Navigation letters={['A', 'B']} />)
    expect(getByText('A'))
    expect(getByText('B'))
  })

  it('Navigation component renders one button link with anchor in href', () => {
    render(<Navigation letters={['A']} />)
    document.querySelectorAll('a')
    expect(document.querySelector('a').getAttribute('href')).toBe('#A')
  })
})
