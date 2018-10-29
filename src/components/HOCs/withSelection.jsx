import React from 'react'
import findIndex from 'lodash/findIndex'

const withSelection = WrappedComponent => {
  return class ComponentWithSelection extends React.Component {
    state = {
      selection: []
    }

    toggleSelection = data => {
      const index = findIndex(this.state.selection, s => s.id === data._id)
      this.setState(state => ({
        selection:
          index === -1
            ? [...state.selection, data]
            : [
                ...state.selection.slice(0, index),
                ...state.selection.slice(index + 1)
              ]
      }))
    }

    clearSelection = () =>
      this.setState(() => ({
        selection: []
      }))

    render() {
      return (
        <WrappedComponent
          selection={this.state.selection}
          toggleSelection={this.toggleSelection}
          clearSelection={this.clearSelection}
          {...this.props}
        />
      )
    }
  }
}

export default withSelection
