import React from 'react'
import PropTypes from 'prop-types'

import { withClient } from 'cozy-client'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import { importContact } from '../../connections/allContacts'
import ExportStepsExplanation from './ExportStepsExplanation'
import ContactImportationActions from './ContactImportationActions'
import ContactImportationCard from './ContactImportationCard'
import Importation from '../../importation'
import Status from '../../importation/status'

class ContactImportationModal extends React.Component {
  state = {
    importation: Importation.INIT,
    progress: null
  }

  updateImportation = importation => {
    this.setState({ importation })
  }

  selectFile = file => {
    this.updateImportation(Importation.selectFile(file, this.state.importation))
  }

  unselectFile = () => {
    this.updateImportation(Importation.unselectFile(this.state.importation))
  }

  onProgress = progress => {
    this.setState({ progress })
  }

  importFile = async () => {
    const { importation } = this.state
    const { closeAction, t, client } = this.props
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: contact => importContact(client, contact),
        onProgress: this.onProgress
      }
    )

    this.updateImportation(runningImportation)

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
      Alerter.success(
        `${t('importation.complete_success')} ${stringCreated}${stringUpdated}`
      )
      closeAction()
    } else {
      this.setState({ progress: null })
      this.updateImportation(finishedImportation)
    }
  }

  render() {
    const { importation, progress } = this.state
    const { closeAction, t } = this.props

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
              onFileSelected={this.selectFile}
              onFileUnselected={this.unselectFile}
            />
          </>
        }
        actions={
          <ContactImportationActions
            importation={importation}
            cancelAction={closeAction}
            importAction={this.importFile}
          />
        }
      />
    )
  }
}

ContactImportationModal.propTypes = {
  closeAction: PropTypes.func.isRequired
}

export default withClient(translate()(ContactImportationModal))
