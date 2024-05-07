/**
 * @typedef {'text'|'tel'|'email'|'button'|'url'|'date'} FieldType
 */

/**
 * @typedef {Object} Option
 * @property {string} value - The value of the option
 * @property {string} label - The label of the option
 */

/**
 * @typedef {Object} CustomLabelOptions
 * @property {string} defaultType - The default type of the option
 * @property {string} defaultLabel - The default label of the option
 * @property {boolean} [hide] - Whether the radio choices is hidden
 */

/**
 * @typedef {Object} LabelField
 * @property {string} name - The name of the label field
 * @property {CustomLabelOptions} customLabelOptions - The custom label field options
 * @property {Option[]} options - The options of the label field
 */

/**
 * @typedef {Object} LabelProps
 * @property {boolean} shrink - passed to InputLabelProps props
 */

/**
 * @typedef {Object} Field
 * @property {string} name - The name of the field
 * @property {string|null} icon - The icon of the field
 * @property {FieldType} type - The type of the field
 * @property {LabelField} [label] - Add a "label" field next to the main field
 * @property {boolean} [isArray] - Whether the field is an array (To add fields dynamically (e.g. email, address, etc.))
 * @property {Field[]} [subFields] - The subfields of the field
 * @property {LabelProps} [labelProps] - The object passed to InputLabelProps props
 * @property {boolean} [isMultiline] - Whether the field is multiline
 */

/**
 * @typedef {Object} RelatedContact
 * @property {string} relatedContactId - The id of the related contact
 * @property {string} relatedContact - The displayName of the related contact
 * @property {string} relatedContactLabel - Object with the type of the related contact stringified (e.g. '{\"type\":\"spouse\"}')
 */

export default {}
