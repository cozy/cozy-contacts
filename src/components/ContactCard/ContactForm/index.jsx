import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import IconEmail from '../../../assets/icons/email.svg'
import IconPhone from '../../../assets/icons/phone-number.svg'
import IconAddress from '../../../assets/icons/location.svg'
import IconCozy from '../../../assets/icons/cozy.svg'
import IconCompany from '../../../assets/icons/company.svg'
import IconBirthday from '../../../assets/icons/calendar.svg'
import IconNote from '../../../assets/icons/comment.svg'

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
    icon: IconPhone,
    type: 'tel',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-phone'
  },
  {
    name: 'email',
    icon: IconEmail,
    type: 'email',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-email'
  },
  {
    name: 'address',
    icon: IconAddress,
    type: 'text',
    hasLabel: true,
    isArray: true,
    addLabel: 'add-address'
  },
  {
    name: 'cozy',
    icon: IconCozy,
    type: 'url',
    hasLabel: true
  },
  {
    name: 'company',
    icon: IconCompany,
    type: 'text'
  },
  {
    name: 'birthday',
    icon: IconBirthday,
    type: 'date'
  },
  {
    name: 'note',
    icon: IconNote,
    type: 'textarea'
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
          <form
            onSubmit={handleSubmit}
            className="u-flex u-flex-column u-flex-items-stretch u-flex-justify-start"
          >
            <FieldsetTitle title={t('contact_info')} />
            {fields.map(({ name, icon, type, required, hasLabel, isArray }) => (
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
                    placeholder={t(`placeholder.${name}`)}
                    required={required}
                    withLabel={hasLabel}
                    labelPlaceholder={t('placeholder.label')}
                  />
                )}
              />
            ))}
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
