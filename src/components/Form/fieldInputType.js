import PropTypes from 'prop-types'

import { fieldInputAttributes } from '../ContactCard/ContactFields/ContactFieldsProptypes'

export const FieldInputWrapperPropTypes = {
  // See official documentation for more information: https://final-form.org/docs/react-final-form/types/FieldRenderProps
  input: PropTypes.object,
  //
  attributes: fieldInputAttributes,
  // Destructuring props
  // See official documentation for more information: https://final-form.org/docs/react-final-form/types/FieldRenderProps
  meta: PropTypes.object,
  //
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  customLabelOptions: PropTypes.shape({
    hide: PropTypes.bool,
    defaultType: PropTypes.string.isRequired,
    defaultLabel: PropTypes.string.isRequired
  }),
  fullWidth: PropTypes.bool
}
