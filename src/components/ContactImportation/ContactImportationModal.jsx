import React from "react";
import PropTypes from "prop-types";
import {
  Alerter,
  Button,
  Modal,
  ModalContent,
  ModalHeader
} from "cozy-ui/react";
import _ from "lodash";
import { withContactsMutations } from "../../connections/allContacts";
import ContactImportationCard from "./ContactImportationCard";
import Importation from "../../importation";
import Status from "../../importation/status";

const ERROR_STATUS_SET = new Set([Status.FILE_ISSUE, Status.COMPLETE_FAILURE]);

class ContactImportationModal extends React.Component {
  state = {
    importation: Importation.init(),
    progress: null
  };

  updateImportation = importation => {
    this.setState({ importation });
  };

  selectFile = file => {
    this.updateImportation(
      Importation.selectFile(file, this.state.importation)
    );
  };

  unselectFile = () => {
    this.updateImportation(Importation.unselectFile(this.state.importation));
  };

  onProgress = progress => {
    this.setState({ progress });
  };

  importFile = async () => {
    const { importation } = this.state;
    const { createContact, closeAction } = this.props;
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: createContact,
        onProgress: this.onProgress
      }
    );

    this.updateImportation(runningImportation);

    const finishedImportation = await finishedImportationPromise;

    if (finishedImportation.status === Status.COMPLETE_SUCCESS) {
      Alerter.success("importation.complete_success", {
        smart_count: _.get(finishedImportation, "report.total", "")
      });
      closeAction();
    } else {
      this.updateImportation(finishedImportation);
    }
  };

  render() {
    const { importation } = this.state;
    const { t } = this.context;
    const { status } = importation;
    const { closeAction } = this.props;

    return (
      <Modal
        into="body"
        size="small"
        className={ERROR_STATUS_SET.has(status) && "importation-error"}
        dismissAction={closeAction}
      >
        <ModalHeader title={t("importation.title")} />
        <ModalContent>
          <p className="importation-section">
            Pour récupérer vos contacts depuis un autre programme, vous devez
            d&apos;abord tous les exporter dans une liste :
          </p>
          <ol className="importation-section importation-step-list">
            <li className="importation-step">
              Ouvrez le gestionnaire de contacts de votre choix
            </li>
            <li className="importation-step">
              Exportez vos contacts dans un fichier de format vcard
              &ldquo;.vcf&rdquo;.
            </li>
          </ol>
          <p className="importation-section">
            <ContactImportationCard
              importation={importation}
              progress={this.state.progress}
              onFileSelected={this.selectFile}
              onFileUnselected={this.unselectFile}
            />
          </p>
          <p className="importation-actions">
            <Button
              label={t("importation.cancel")}
              theme="secondary"
              onClick={closeAction}
            />
            {Importation.canRetry(importation) ? (
              <Button
                label={t("importation.retry")}
                onClick={this.importFile}
              />
            ) : (
              <Button
                label={t("importation.run")}
                disabled={!Importation.canRun(importation)}
                busy={importation.isRunning}
                onClick={this.importFile}
              />
            )}
          </p>
        </ModalContent>
      </Modal>
    );
  }
}
ContactImportationModal.propTypes = {
  createContact: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired
};

export default withContactsMutations(ContactImportationModal);
