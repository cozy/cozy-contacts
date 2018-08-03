import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'cozy-ui/react'
import palette from 'cozy-ui/stylus/settings/palette.json'
import IconTeam from '../../assets/icons/team.svg'

const ImportVcardButton = ({ className, onClick }, { t }) => (
  <Button
    className={className}
    icon={<Icon icon={IconTeam} color={palette.coolGrey} />}
    label={t('empty.importation')}
    theme="secondary"
    onClick={onClick}
  />
)

ImportVcardButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export default ImportVcardButton
