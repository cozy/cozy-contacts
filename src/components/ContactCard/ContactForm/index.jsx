import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { Button } from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import IconEmail from '../../../assets/icons/email.svg'
import IconPhone from '../../../assets/icons/phone-number.svg'
import IconAddress from '../../../assets/icons/location.svg'
import IconCozy from '../../../assets/icons/cozy.svg'
import IconCompany from '../../../assets/icons/company.svg'
import IconBirthday from '../../../assets/icons/calendar.svg'
import IconNote from '../../../assets/icons/comment.svg'

import ContactFormField from './ContactFormField'
import ContactFieldInput from '../ContactFieldInput'
import { fullContactPropTypes } from '../../ContactPropTypes'
import contactToFormValues from './contactToFormValues'
import formValuesToContact from './formValuesToContact'

const fields = [
  {
    name: 'givenName',
    icon: null,
    type: 'text'
  },
  {
    name: 'familyName',
    icon: null,
    type: 'text',
    required: true
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

const ContactForm = ({ contact, onCancel, onSubmit, t }) => (
  <Form
    mutators={{ ...arrayMutators }}
    onSubmit={data => onSubmit(formValuesToContact(data))}
    initialValues={contactToFormValues(contact, t)}
    render={({ handleSubmit }) => (
      <div>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form__fields">
            {fields.map(({ name, icon, type, required, hasLabel, isArray }) => (
              <ContactFormField
                key={name}
                name={name}
                icon={icon}
                label={t(`field.${name}`)}
                t={t}
                isArray={isArray}
                renderInput={inputName => (
                  <ContactFieldInput
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
          </div>

          <div className="contact-form__footer">
            <div>
              <Button
                type="button"
                theme="secondary"
                label={t('cancel')}
                onClick={onCancel}
              />
              <Button type="submit" label={t('save')} />
            </div>
          </div>
        </form>
      </div>
    )}
  />
)

ContactForm.propTypes = {
  contact: fullContactPropTypes,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export { fields }

export default translate()(ContactForm)
