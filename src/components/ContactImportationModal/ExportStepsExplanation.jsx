import React from 'react'
import { translate } from 'twake-i18n'

const ExportStepsExplanation = ({ t }) => {
  return (
    <div>
      <p>{t('importation.export_steps_intro')}</p>
      <ol>
        <li>{t('importation.open_contact_manager_step')}</li>
        <li>{t('importation.export_to_vcard_step')}</li>
      </ol>
    </div>
  )
}

export default translate()(ExportStepsExplanation)
