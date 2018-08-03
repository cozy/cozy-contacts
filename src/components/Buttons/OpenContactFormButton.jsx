import React from 'react'
import PropTypes from 'prop-types'
import PrimaryButton from './PrimaryButton'

const OpenContactFormButton = ({ onClick }, { t }) => (
  <PrimaryButton onClick={onClick} icon="plus">
    {t('create_contact')}
  </PrimaryButton>
)
OpenContactFormButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default OpenContactFormButton
