import React from "react";
import PropTypes from "prop-types";
import { Icon } from "cozy-ui/react";
import ContactImportationStatus from "./ContactImportationStatus";
import Importation from "../../../../importation";
import Status from "../../../../importation/status";

const FILE_SELECTION_NEEDED_STATUSES = new Set([
  Status.UNCONFIGURED,
  Status.FILE_ISSUE,
  Status.COMPLETE_FAILURE
]);

export default function ContactTransferButton({ status, fileAction }, { t }) {
  if (!FILE_SELECTION_NEEDED_STATUSES.has(status)) {
    return <ContactImportationStatus status={status} />;
  }

  return (
    <span
      role="button"
      className="c-btn c-btn--secondary c-btn--subtle importation-file-selection-button"
    >
      <span>
        <Icon icon="upload" className="importation-file-selection-icon" />
        {t("importation.transfer_file")}
        <input
          className="importation-file-selection-input"
          type="file"
          accept={Importation.VALID_FILE_TYPES.join(", ")}
          onChange={event => fileAction(event.target.files[0])}
        />
      </span>
    </span>
  );
}
ContactTransferButton.propTypes = {
  status: Status.propType.isRequired,
  fileAction: PropTypes.func.isRequired
};
