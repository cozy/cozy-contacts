import React from 'react'
import { PropTypes } from 'prop-types'
import { Button } from 'cozy-ui/react'
import IconTeam from '../assets/icons/team.svg'
import { translate } from 'cozy-ui/react/I18n'
const Toolbar = ({ displayContactForm, displayVcardImport, t }) => {
  return (
    <div className="actions">
      <Button
        onClick={displayContactForm}
        icon="plus"
        label={t('create_contact')}
      />
      <Button
        onClick={displayVcardImport}
        label={t('empty.importation')}
        theme="secondary"
        icon={IconTeam}
      />
    </div>
  )
}

Toolbar.propTypes = {
  displayContactForm: PropTypes.func.isRequired,
  displayVcardImport: PropTypes.func.isRequired
}

export default translate()(Toolbar)
