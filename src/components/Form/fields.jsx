import React from 'react'
import Input from 'cozy-ui/transpiled/react/Input'
import Textarea from 'cozy-ui/transpiled/react/Textarea'

function adaptField(WrappedComponent) {
  class AdaptField extends React.Component {
    render() {
      const {
        input,
        meta: { valid },
        ...rest
      } = this.props
      return <WrappedComponent {...input} {...rest} data-valid={valid} />
    }
  }
  AdaptField.displayName = `adaptField(${getDisplayName(WrappedComponent)})`
  return AdaptField
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const AdaptedInput = adaptField(Input)
const AdaptedTextarea = adaptField(Textarea)

export { AdaptedInput, AdaptedTextarea }
