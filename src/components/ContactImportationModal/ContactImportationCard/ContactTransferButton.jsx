import React from "react";
import PropTypes from "prop-types";
import { Icon } from "cozy-ui/react";
import Importation from "../../../importation";

export default function ContactTransferButton({ fileAction }, { t }) {
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
  fileAction: PropTypes.func.isRequired
};
