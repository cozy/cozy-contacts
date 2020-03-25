import React, { Component } from 'react'
import PropTypes from 'prop-types'
import flag from 'cozy-flags'
import { Button } from 'cozy-ui/react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'

import { sortLastNameFirst, getLastNameFirstLetterWithoutAccent } from './'
import ContactsEmptyList from './ContactsEmptyList'
import ContactRow from './ContactRow'
import ContactAlphabetJump from './ContactAlphabetJump'
import ContactHeaderRow from './ContactHeaderRow'
import withModal from '../HOCs/withModal'
import ContactCardModal from '../Modals/ContactCardModal'
import withSelection from '../Selection/selectionContainer'

class ContactsList extends Component {
  render() {
    const {
      clearSelection,
      contacts,
      selection,
      showModal,
      selectAll,
      t,
      breakpoints: { isMobile, isTablet }
    } = this.props

    if (contacts.length === 0) {
      return <ContactsEmptyList />
    } else {
      const allContactsSelected = contacts.length === selection.length
      const sortedContacts = [...contacts].sort(sortLastNameFirst)
      const categorizedContacts = sortedContacts.reduce((acc, contact) => {
        const header = getLastNameFirstLetterWithoutAccent(contact) || 'EMPTY'
        acc[header] = acc[header] || []
        acc[header].push(contact)
        return acc
      }, {})
      const headers = Object.keys(categorizedContacts)

      const refs = headers.reduce((acc, value) => {
        acc[value] = React.createRef()
        return acc
      }, {})

      const scrollTo = item => {
        if (isMobile || isTablet) {
          const offset = isMobile ? 66 : 64
          window.scrollTo({
            top: refs[item].current.offsetTop + offset,
            behavior: 'smooth'
          })
        } else {
          const element = document.getElementById('content')

          element.scrollTo({
            top: refs[item].current.offsetTop,
            behavior: 'smooth'
          })
        }
      }

      return (
        <div className="list-wrapper">
          {flag('select-all-contacts') && (
            <div>
              <Button
                label={
                  allContactsSelected ? t('unselect-all') : t('select-all')
                }
                theme="secondary"
                onClick={() =>
                  allContactsSelected ? clearSelection() : selectAll(contacts)
                }
              />
            </div>
          )}
          <ContactAlphabetJump
            headers={headers}
            scrollTo={item => scrollTo(item)}
          />
          <ol className="list-contact">
            {headers.map(header => (
              <li key={`cat-${header}`} ref={refs[header]}>
                <ContactHeaderRow key={header} header={header} />
                <ol className="sublist-contact">
                  {categorizedContacts[header].map(contact => (
                    <li key={`contact-${contact._id}`}>
                      <ContactRow
                        id={contact._id}
                        key={contact._id}
                        contact={contact}
                        onClick={() =>
                          showModal(
                            <ContactCardModal
                              onClose={this.hideContactCard}
                              id={contact._id}
                            />
                          )
                        }
                      />
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      )
    }
  }
}
ContactsList.propTypes = {
  showModal: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
}
ContactsList.defaultProps = {}

export default withBreakpoints()(
  translate()(withModal(withSelection(ContactsList)))
)
