import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import FieldsetTitle from '../../Components/FieldsetTitle'
import ContactFormField from './ContactFormField'
import ContactFieldInput from '../ContactFieldInput'
import { fullContactPropTypes } from '../../ContactPropTypes'
import contactToFormValues from './contactToFormValues'
import formValuesToContact from './formValuesToContact'

const fields = [
  {
    name: 'givenName',
    icon: 'people',
    type: 'text'
  },
  {
    name: 'familyName',
    icon: null,
    type: 'text'
  },
  {
    name: 'phone',
    icon: 'telephone',
    type: 'tel',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-phone'
  },
  {
    name: 'email',
    icon: 'email',
    type: 'email',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-email'
  },
  {
    name: 'address',
    icon: 'location',
    type: 'text',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-address'
  },
  {
    name: 'cozy',
    icon: 'cloud',
    type: 'url',
    hasLabel: true
  },
  {
    name: 'company',
    icon: 'company',
    type: 'text'
  },
  {
    name: 'birthday',
    icon: 'calendar',
    type: 'date',
    labelProps: { shrink: true }
  },
  {
    name: 'note',
    icon: 'comment',
    type: 'text',
    isMultiline: true
  }
]

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

const ContactForm = ({ contact, onSubmit, t }) => (
  <Form
    mutators={{ ...arrayMutators }}
    onSubmit={data => onSubmit(formValuesToContact(data, contact))}
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
                  label={t(`field.${name}`)}
                  t={t}
                  isArray={isArray}
                  renderInput={(inputName, id) => (
                    <ContactFieldInput
                      id={id}
                      name={inputName}
                      type={type}
                      label={t(`field.${name}`)}
                      placeholder={t(`placeholder.${name}`)}
                      required={required}
                      withLabel={hasLabel}
                      labelPlaceholder={t('placeholder.label')}
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

ContactForm.propTypes = {
  contact: fullContactPropTypes,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export { fields }

export default translate()(ContactForm)
