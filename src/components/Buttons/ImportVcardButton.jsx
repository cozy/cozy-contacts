import React from 'react'
import PropTypes from 'prop-types'
import IconTeam from '../../assets/icons/team.svg'
import SecondaryButton from './SecondaryButton'

const ImportVcardButton = ({ className, onClick }, { t }) => (
  <SecondaryButton
    className={className}
    icon={IconTeam}
    theme="secondary"
    onClick={onClick}
  >
    {t('empty.importation')}
  </SecondaryButton>
)

ImportVcardButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
ImportVcardButton.defaultProps = {
  className: ''
}

export default ImportVcardButton
