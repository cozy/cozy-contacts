import cloneDeep from 'lodash/cloneDeep'

// COZY_LOCALE is injected by the stack, see https://docs.cozy.io/en/cozy-stack/apps/#available-fields-to-the-service
export const lang = process.env.COZY_LOCALE || 'en'

export const attributeNames = ['address', 'cozy', 'email', 'phone']
const PRO_KEYWORDS = {
  fr: [
    'pro',
    'professionnel',
    'professionnelle',
    'bureau',
    'travail',
    'boulot',
    'taff',
    'work'
  ],
  en: ['pro', 'professional', 'office', 'job', 'work']
}

/**
 * Set a specific label value of an attribute according to its name
 * only if the label is undefined
 * @param {import('cozy-client/types/types').IOCozyContact} contact - An io.cozy.contacts doc
 * @param {string} attributeName - Name of the contact attribute
 * @returns {object|undefined} The updated attribute
 */
export const updateAttributeWithLabel = (contact, attributeName) => {
  const values = contact[attributeName]

  if (!values) {
    return
  }

  const updatedAttr = values.map(el => {
    if (!el.label && el.type) {
      const normalizedType = el.type
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      el.label = PRO_KEYWORDS[lang].includes(normalizedType) ? 'work' : 'home'
    }

    return el
  })

  return updatedAttr
}

/**
 * @param {import('cozy-client/types/types').IOCozyContact} contact - An io.cozy.contacts doc
 * @returns {import('cozy-client/types/types').IOCozyContact} The updated contact
 */
export const updateContactAttributes = contact => {
  const updatedContact = cloneDeep(contact)

  attributeNames.map(attributeName => {
    const attribute = contact[attributeName]
    if (attribute) {
      updatedContact[attributeName] = updateAttributeWithLabel(
        updatedContact,
        attributeName
      )
    }
  })

  return updatedContact
}

/**
 * @param {import('cozy-client/types/types').IOCozyContact[]} contacts - Array of io.cozy.contacts doc
 * @returns Array of updated contacts
 */
export const updateContacts = contacts => {
  const updatedContacts = contacts.map(contact =>
    updateContactAttributes(contact)
  )

  return updatedContacts
}
