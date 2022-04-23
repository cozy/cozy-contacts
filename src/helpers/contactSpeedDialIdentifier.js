export const getContactSpeedDialIdentifier = contact => {
  const extractedIdentifier =
    contact &&
    contact.displayName &&
    contact.displayName.substring(0, 1) &&
    contact.displayName.substring(0, 1).toLowerCase()

  // Does not work in real life, most probably because of a Babel config
  // const extractedIdentifier = contact?.displayName
  //   ?.substring(0, 1)
  //   .toLowerCase()
  return extractedIdentifier && extractedIdentifier.length
    ? extractedIdentifier
    : undefined
}

export const getSortedIdentifiers = (contacts, lang) => {
  return [...new Set(contacts.map(getContactSpeedDialIdentifier))]
    .filter(id => id && id.length)
    .sort(new Intl.Collator(lang).compare)
}
