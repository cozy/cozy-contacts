// Importation report, used to:
// - know what to do next in UI (hence the various counters)
// - debug issues (hence the skipped contacts with error details)

import { PropTypes } from "prop-types";

const contactWithErrorPropType = errorPropName =>
  PropTypes.shape({
    contact: PropTypes.object.isRequired,
    [errorPropName]: PropTypes.instanceOf(Error).isRequired
  });

const skippedArrayPropType = PropTypes.arrayOf(
  PropTypes.oneOf([
    contactWithErrorPropType("transformError"),
    contactWithErrorPropType("saveError")
  ])
);

const propType = PropTypes.oneOf([
  PropTypes.shape({
    parseError: PropTypes.instanceOf(Error).isRequired
  }),
  PropTypes.shape({
    imported: PropTypes.number.isRequired,
    skipped: skippedArrayPropType.isRequired,
    total: PropTypes.number.isRequired,
    unsaved: PropTypes.number.isRequired
  })
]);

export default {
  propType
};
