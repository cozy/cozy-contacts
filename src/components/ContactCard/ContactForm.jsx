import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import ContactFormField from './ContactFormField'
import ContactFieldInput from './ContactFieldInput'
import { Button } from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import IconEmail from '../../assets/icons/email.svg'
import IconPhone from '../../assets/icons/phone-number.svg'
import IconAddress from '../../assets/icons/location.svg'
import IconCozy from '../../assets/icons/cozy.svg'
import IconCompany from '../../assets/icons/company.svg'
import IconBirthday from '../../assets/icons/calendar.svg'
import IconNote from '../../assets/icons/comment.svg'

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
    isArray: true
  },
  {
    name: 'email',
    icon: IconEmail,
    type: 'email',
    hasLabel: true,
    isArray: true
  },
  {
    name: 'address',
    icon: IconAddress,
    type: 'text',
    hasLabel: true,
    isArray: true
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

// initialize the form values, required so that array fields start with at least one editable field
const initialFieldValues = fields.reduce((initialValues, { name, isArray }) => {
  initialValues[name] = isArray ? [undefined] : undefined
  return initialValues
}, {})

class ContactForm extends React.Component {
  formDataToContact = data => {
    const {
      givenName,
      familyName,
      phone,
      email,
      address,
      cozy,
      company,
      birthday,
      note
    } = data

    const fullName = (givenName || '') + ' ' + (familyName || '')

    const contact = {
      fullname: fullName.trim(),
      name: {
        givenName,
        familyName
      },
      email: email.filter(val => val).map(({ email, emailLabel }, index) => ({
        address: email,
        type: emailLabel,
        primary: index === 0
      })),
      address: address
        .filter(val => val)
        .map(({ address, addressLabel }, index) => ({
          formattedAddress: address,
          type: addressLabel,
          primary: index === 0
        })),
      phone: phone.filter(val => val).map(({ phone, phoneLabel }, index) => ({
        number: phone,
        type: phoneLabel,
        primary: index === 0
      })),
      groups: [],
      cozy: cozy
        ? [
            {
              url: cozy,
              label: data['cozyLabel'],
              primary: true
            }
          ]
        : undefined,
      company,
      birthday,
      note,
      metadata: {
        version: 1,
        cozy: true
      }
    }

    this.props.onSubmit(contact)
  }

  render() {
    const { onCancel, t } = this.props
    return (
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={this.formDataToContact}
        initialValues={initialFieldValues}
        render={({ handleSubmit }) => (
          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form__fields">
                {fields.map(
                  ({ name, icon, type, required, hasLabel, isArray }) => (
                    <ContactFormField
                      key={name}
                      name={name}
                      icon={icon}
                      label={t(`field.${name}`)}
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
                  )
                )}
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
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(ContactForm)
