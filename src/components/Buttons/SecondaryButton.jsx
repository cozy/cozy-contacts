import React from 'react'
import PrimaryButton from './PrimaryButton'

const SecondaryButton = props => <PrimaryButton theme="secondary" {...props} />

SecondaryButton.propTypes = PrimaryButton.propTypes
SecondaryButton.defaultProps = PrimaryButton.defaultProps

export default SecondaryButton
