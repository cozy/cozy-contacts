import arrayMutators from 'final-form-arrays'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'

import { getHasManyItems } from 'cozy-client/dist/associations/HasMany'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import FieldInputLayout from './FieldInputLayout'
import contactToFormValues from './contactToFormValues'
import { fields } from './fieldsConfig'
import formValuesToContact from './formValuesToContact'
import { validateFields, fieldsRequired } from './helpers'
import { fullContactPropTypes } from '../../ContactPropTypes'
import FieldInput from '../FieldInput'

// this variable will be set in the form's render prop
// and used by the submit button in ContactFormModal
// to be able to trigger the submit from outside the form
// See react-final-form examples here: https://www.npmjs.com/package/react-final-form#external-submit
let _submitContactForm

function setSubmitContactForm(handleSubmit) {
  _submitContactForm = handleSubmit
}

export function getSubmitContactForm() {
  return _submitContactForm
}

const ContactForm = ({ contact, onSubmit, contacts }) => {
  const { t } = useI18n()

  return (
    <Form
      mutators={{ ...arrayMutators }}
      validate={values => validateFields(values, t)}
      onSubmit={formValues =>
        onSubmit(formValuesToContact({ formValues, oldContact: contact, t }))
      }
      initialValues={contactToFormValues(contact, t)}
      render={({ handleSubmit, valid, submitFailed, errors }) => {
        setSubmitContactForm(handleSubmit)
        return (
          <form
            role="form"
            onSubmit={handleSubmit}
            className="u-flex u-flex-column"
          >
            {fields.map(({ name, icon, label, isArray, ...attributes }) => (
              <FieldInputLayout
                key={name}
                name={name}
                icon={icon}
                isArray={isArray}
                renderInput={inputName => {
                  const isOneOfFields = fieldsRequired.includes(inputName)
                  const isError = isOneOfFields && !valid && submitFailed

                  return (
                    <FieldInput
                      attributes={attributes}
                      contacts={contacts}
                      error={isError}
                      helperText={isError ? errors[inputName] : null}
                      name={inputName}
                      label={t(`fields.${name}`)}
                      labelProps={label}
                    />
                  )
                }}
              />
            ))}
          </form>
        )
      }}
    />
  )
}

ContactForm.propTypes = {
  contact: fullContactPropTypes,
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  })
}

// Used to avoid unnecessary multiple rendering of ContactForm when creating a new contact in another way.
// These unnecessary renderings prevented the addition of a newly created linked contact. (Creation of a contact when selecting a linked contact)
export const isSameContactProp = (prevProps, nextProps) => {
  if (!prevProps.contact?.relationships || !nextProps.contact?.relationships) {
    return false
  }

  const prevContactIdsRelated = getHasManyItems(
    prevProps.contact,
    'related'
  ).map(r => r._id)
  const nextContactIdsRelated = getHasManyItems(
    nextProps.contact,
    'related'
  ).map(r => r._id)

  if (
    prevContactIdsRelated.length !== nextContactIdsRelated.length ||
    !prevContactIdsRelated.every(id => nextContactIdsRelated.includes(id))
  ) {
    return false
  }

  return true
}

// export default ContactForm
export default React.memo(ContactForm, isSameContactProp)
