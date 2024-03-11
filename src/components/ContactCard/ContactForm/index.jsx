import arrayMutators from 'final-form-arrays'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-final-form'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ContactFormField from './ContactFormField'
import contactToFormValues from './contactToFormValues'
import { fields } from './fieldsConfig'
import formValuesToContact from './formValuesToContact'
import FieldsetTitle from '../../Common/FieldsetTitle'
import { fullContactPropTypes } from '../../ContactPropTypes'
import ContactFieldInput from '../ContactFieldInput'

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

const oneOfMandatoryFields = [
  'givenName',
  'familyName',
  'email[0].email',
  'cozy'
]

const ContactForm = ({ contact, onSubmit }) => {
  const { t } = useI18n()
  return (
    <Form
      mutators={{ ...arrayMutators }}
      validate={values => {
        const errors = {}
        if (oneOfMandatoryFields.every(field => !get(values, field))) {
          oneOfMandatoryFields.forEach(field => {
            errors[field] = t('fields.required')
          })
        }
        return errors
      }}
      onSubmit={formValues =>
        onSubmit(formValuesToContact({ formValues, oldContact: contact, t }))
      }
      initialValues={contactToFormValues(contact, t)}
      render={({ handleSubmit, valid, submitFailed, errors }) => {
        setSubmitContactForm(handleSubmit)
        return (
          <div>
            <form
              role="form"
              onSubmit={handleSubmit}
              className="u-flex u-flex-column"
            >
              <FieldsetTitle title={t('contact_info')} />
              {fields.map(
                ({ name, icon, hasLabel, isArray, ...attributes }) => (
                  <ContactFormField
                    key={name}
                    name={name}
                    icon={icon}
                    isArray={isArray}
                    renderInput={(inputName, id) => {
                      const isOneOfFields =
                        oneOfMandatoryFields.includes(inputName)
                      const isError = isOneOfFields && !valid && submitFailed
                      return (
                        <ContactFieldInput
                          attributes={attributes}
                          error={isError}
                          helperText={isError ? errors[inputName] : null}
                          id={id}
                          name={inputName}
                          label={t(`fields.${name}`)}
                          withLabel={hasLabel}
                          labelPlaceholder={t('fields.label')}
                        />
                      )
                    }}
                  />
                )
              )}
            </form>
          </div>
        )
      }}
    />
  )
}

ContactForm.propTypes = {
  contact: fullContactPropTypes,
  onSubmit: PropTypes.func.isRequired
}

export default ContactForm
