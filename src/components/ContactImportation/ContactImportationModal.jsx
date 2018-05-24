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
    progress: null
  };

  selectFile = file => {
    this.props.updateImportation(
      Importation.selectFile(file, this.props.importation)
    );
  };

  unselectFile = () => {
    this.props.updateImportation(
      Importation.unselectFile(this.props.importation)
    );
  };

  onProgress = progress => {
    this.setState({ progress });
  };

  importFile = async () => {
    const { createContact, importation, updateImportation } = this.props;
    const { runningImportation, finishedImportationPromise } = Importation.run(
      importation,
      {
        save: createContact,
        onProgress: this.onProgress
      }
    );

    updateImportation(runningImportation);

    const finishedImportation = await finishedImportationPromise;

    if (finishedImportation.status === Status.COMPLETE_SUCCESS) {
      Alerter.success("importation.complete_success", {
        smart_count: _.get(finishedImportation, "report.total", "")
      });
      this.forgetImportation();
    } else {
      updateImportation(finishedImportation);
    }
  };

  forgetImportation = () => {
    this.props.updateImportation(null);
  };

  render() {
    const { importation } = this.props;
    const { t } = this.context;
    const { status } = importation;

    return (
      <Modal
        into="body"
        size="small"
        className={ERROR_STATUS_SET.has(status) && "importation-error"}
        dismissAction={this.forgetImportation}
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
              onClick={this.forgetImportation}
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
  importation: Importation.propType.isRequired,
  updateImportation: PropTypes.func.isRequired
};

export default withContactsMutations(ContactImportationModal);
