import React from "react";
import Status from "../../importation/status";

const DISPLAYABLE_STATUS_TRANSLATION_KEYS = {
  [Status.READY]: "importation.ready",
  [Status.RUNNING]: "importation.running"
};

export default function ContactImportationStatus({ status }, { t }) {
  const key = DISPLAYABLE_STATUS_TRANSLATION_KEYS[status];
  return key && <span className="importation-status">{t(key)}</span>;
}
ContactImportationStatus.propTypes = {
  status: Status.propType.isRequired
};
