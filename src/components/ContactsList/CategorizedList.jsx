import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Alerter from 'cozy-ui/transpiled/react/Alerter'

import ContactHeaderRow from './ContactHeaderRow'
import ContactsSubList from './ContactsSubList'
import { categorizeContacts } from '../../helpers/contactList'
import useKeypress from '../Hooks/useKeypress'

const CategorizedList = ({ contacts }) => {
  const { t } = useI18n()
  const categorizedContacts = categorizeContacts(contacts, t('empty-list'))

  const categoriesRefs = {
    a: useRef(),
    b: useRef(),
    c: useRef(),
    d: useRef(),
    e: useRef(),
    f: useRef(),
    g: useRef(),
    h: useRef(),
    i: useRef(),
    j: useRef(),
    k: useRef(),
    l: useRef(),
    m: useRef(),
    n: useRef(),
    o: useRef(),
    p: useRef(),
    q: useRef(),
    r: useRef(),
    s: useRef(),
    t: useRef(),
    u: useRef(),
    v: useRef(),
    w: useRef(),
    x: useRef(),
    y: useRef(),
    z: useRef()
  }

  // Handle keypress event to navigate to the corresponding contact category.
  useKeypress(event => {
    if (!categoriesRefs[event.key.toLowerCase()].current) {
      return
    }
    categoriesRefs[event.key.toLowerCase()].current.scrollIntoView()
    Alerter.info(`${t('navigate_to')} ${event.key.toUpperCase()}`)
  })

  return (
    <ol className="list-contact">
      {Object.entries(categorizedContacts).map(([header, contacts]) => (
        <li key={`cat-${header}`} ref={categoriesRefs[header]}>
          <ContactHeaderRow key={header} header={header} />
          <ContactsSubList contacts={contacts} />
        </li>
      ))}
    </ol>
  )
}

CategorizedList.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default CategorizedList
