import React from 'react'

import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

const ExportStepsExplanation = ({ t }) => {
  return (
    <div className="importation-export-steps-explanation">
      <p className="importation-section">
        {t('importation.export_steps_intro')}
      </p>
      <ol className="importation-section importation-step-list">
        <li className="importation-step">
          {t('importation.open_contact_manager_step')}
        </li>
        <li className="importation-step">
          {t('importation.export_to_vcard_step')}
        </li>
      </ol>
    </div>
  )
}

export default translate()(ExportStepsExplanation)
