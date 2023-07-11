import { render, screen, act } from '@testing-library/react'
import PropTypes from 'prop-types'
import React from 'react'

import selectionContainer from './selectionContainer'
import configureStore from '../../store/configureStore'
import AppLike from '../../tests/Applike'
import getCozyClient from '../../tests/client'

let props

const DummyComponent = ({ title = '', ...remainingProps }) => {
  props = remainingProps
  return <span data-testid="DummyElement" title={title} />
}
DummyComponent.propTypes = {
  title: PropTypes.string
}
const DummyComponentWithSelection = selectionContainer(DummyComponent)

describe('A component with selection', () => {
  it('should toggle the selection', () => {
    const store = configureStore(getCozyClient(), null, {})
    const root = (
      <AppLike>
        <DummyComponentWithSelection store={store} />
      </AppLike>
    )
    render(root)

    act(() => {
      props.toggleSelection({ _id: 1, id: 1 })
    })

    act(() => {
      props.toggleSelection({ _id: 2, id: 2 })
    })

    expect(props.selection).toEqual([
      { _id: 1, id: 1 },
      { _id: 2, id: 2 }
    ])

    act(() => {
      props.toggleSelection({ _id: 2, id: 2 })
    })

    expect(props.selection).toEqual([{ _id: 1, id: 1 }])
  })

  it('should clear the selection', () => {
    const store = configureStore(getCozyClient(), null, {})
    const root = (
      <AppLike>
        <DummyComponentWithSelection store={store} />
      </AppLike>
    )
    render(root)

    expect(props.selection.length).toEqual(0)

    act(() => {
      props.toggleSelection({ _id: 1, id: 1 })
    })

    act(() => {
      props.toggleSelection({ _id: 2, id: 2 })
    })

    expect(props.selection.length).toEqual(2)

    act(() => {
      props.clearSelection()
    })

    expect(props.selection.length).toEqual(0)
  })

  it('should pass other props', () => {
    const root = (
      <AppLike>
        <DummyComponentWithSelection title="with prop" />
      </AppLike>
    )
    render(root)

    const dummyElement = screen.queryByTestId('DummyElement')
    expect(dummyElement).not.toBeNull()
    expect(dummyElement.title).toEqual('with prop')
  })
})
