import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useAlert } from 'cozy-ui/transpiled/react/providers/Alert'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactImportationActions from './ContactImportationActions'
import ContactImportationCard from './ContactImportationCard'
import ExportStepsExplanation from './ExportStepsExplanation'
import { importContact } from '../../connections/allContacts'
import Importation from '../../importation'
import Status from '../../importation/status'

const ContactImportationModal = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const closeAction = () => navigate('/')
  const { showAlert } = useAlert()

  const [progress, setProgress] = useState(null)
  const [importation, setImportation] = useState(Importation.INIT)

  const selectFile = file => {
    setImportation(Importation.selectFile(file, importation))
  }

  const unselectFile = () => {
    setImportation(Importation.unselectFile(importation))
  }

  const importFile = async () => {
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: contact => importContact(client, contact),
        onProgress: progress => setProgress(progress)
      }
    )

    setImportation(runningImportation)

    const finishedImportation = await finishedImportationPromise
    if (finishedImportation.status === Status.COMPLETE_SUCCESS) {
      const created = Importation.created(finishedImportation)
      const updated = Importation.updated(finishedImportation)
      const stringCreated =
        created > 0 ? t('importation.creation', created) : ''
      const stringUpdated =
        updated > 0
          ? created > 0
            ? `, ${t('importation.update', updated)}`
            : `${t('importation.update', updated)}`
          : ''
      showAlert({
        severity: 'success',
        message: `${t(
          'importation.complete_success'
        )} ${stringCreated}${stringUpdated}`
      })
      closeAction()
    } else {
      setProgress(null)
      setImportation(finishedImportation)
    }
  }

  return (
    <Dialog
      open={true}
      onClose={closeAction}
      title={t('importation.title')}
      content={
        <>
          <ExportStepsExplanation />
          <ContactImportationCard
            importation={importation}
            progress={progress}
            onFileSelected={selectFile}
            onFileUnselected={unselectFile}
          />
        </>
      }
      actions={
        <ContactImportationActions
          importation={importation}
          cancelAction={closeAction}
          importAction={importFile}
        />
      }
    />
  )
}

export default ContactImportationModal
