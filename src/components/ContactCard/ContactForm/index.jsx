import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import FieldsetTitle from '../../Common/FieldsetTitle'
import ContactFormField from './ContactFormField'
import ContactFieldInput from '../ContactFieldInput'
import { fullContactPropTypes } from '../../ContactPropTypes'
import contactToFormValues from './contactToFormValues'
import formValuesToContact from './formValuesToContact'
import { fields } from './fieldsConfig'

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

const ContactForm = ({ contact, onSubmit }) => {
  const { t } = useI18n()
  return (
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={formValues =>
        onSubmit(formValuesToContact({ formValues, oldContact: contact, t }))
      }
      initialValues={contactToFormValues(contact, t)}
      render={({ handleSubmit }) => {
        setSubmitContactForm(handleSubmit)
        return (
          <div>
            <form onSubmit={handleSubmit} className="u-flex u-flex-column">
              <FieldsetTitle title={t('contact_info')} />
              {fields.map(
                ({
                  name,
                  icon,
                  type,
                  required,
                  hasLabel,
                  isArray,
                  labelProps,
                  isMultiline
                }) => (
                  <ContactFormField
                    key={name}
                    name={name}
                    icon={icon}
                    label={t(`fields.${name}`)}
                    t={t}
                    isArray={isArray}
                    renderInput={(inputName, id) => (
                      <ContactFieldInput
                        id={id}
                        name={inputName}
                        type={type}
                        label={t(`fields.${name}`)}
                        required={required}
                        withLabel={hasLabel}
                        labelPlaceholder={t('fields.label')}
                        labelProps={labelProps}
                        isMultiline={isMultiline}
                      />
                    )}
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
