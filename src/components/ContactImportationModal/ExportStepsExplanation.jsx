import React from "react";

export default function ExportStepsExplanation(props, { t }) {
  return (
    <div className="importation-export-steps-explanation">
      <p className="importation-section">
        {t("importation.export_steps_intro")}
      </p>
      <ol className="importation-section importation-step-list">
        <li className="importation-step">
          {t("importation.open_contact_manager_step")}
        </li>
        <li className="importation-step">
          {t("importation.export_to_vcard_step")}
        </li>
      </ol>
    </div>
  );
}
